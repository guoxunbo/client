import { Button, Tag ,Input, Select} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';
import EventUtils from '../../../api/utils/EventUtils';

const { Option} = Select;

/**
 * 湖南仓 其他出备货表格
 */
export default class HNWarehouseCOMReservedMLotTable extends EntityListCheckTable {

    static displayName = 'HNWarehouseCOMReservedMLotTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    componentWillReceiveProps = (props) => {
        let {selectedRowKeys, selectedRows} = this.state;
        let columnData = this.buildColumn(props.table);;
        let stateSeletcedRowKeys = selectedRowKeys.merge(props.selectedRowKeys);
        let stateSelectedRows = selectedRows.merge(props.selectedRows, this.props.rowKey);
        if (props.resetFlag) {
            stateSeletcedRowKeys = [];
            stateSelectedRows = [];
            this.setState({
                value: "",
            });
        }
        
        this.setState({
            data: props.data,
            table: props.table,
            columns: columnData.columns,
            scrollX: columnData.scrollX,
            selectedRowKeys: stateSeletcedRowKeys || [],
            selectedRows: stateSelectedRows || [],
            pagination: props.pagination != undefined ? props.pagination : Application.table.pagination
        })
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAutoMaticPacking());
        buttons.push(this.createReserved());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createLocationSelecctAndInputTag());
        tags.push(this.createMissZeroQty());
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createLocationSelecctAndInputTag = () => {
        let packedRuleList = this.props.packedRuleList;
        let defaultQty = this.props.defaultQty;
        if(this.state.value == "" || this.state.value == undefined){
            this.state.value = defaultQty;
        }
        let options;
        if(packedRuleList || packedRuleList != undefined){
            options = packedRuleList.map(d => <Option key={d.key}>{d.value}</Option>);
        }
        return <span style={{display: 'flex'}}>
        <span style={{marginLeft:"30px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.remarks)}:</span>
        <span style = {{marginLeft:"10px"}}>
            <Input ref={(input) => { this.input = input }} style={{ width: 300}} key="stockNote" placeholder="备货备注" />
        </span>

        <span style={{marginLeft:"10px", fontSize:"19px"}}>{I18NUtils.getClientMessage(i18NCode.PackedRule)}:</span>
        <span style = {{marginLeft:"10px"}}>
            <Select
                showSearch
                allowClear
                value={this.state.value}
                style={{ width: 200}}
                onChange={this.handleChange}
                disabled={this.props.disabled}
                onBlur={this.props.onBlur}
                placeholder="包装规格">
                {options} 
         </Select>
      </span>
    </span>
    }

    handleChange = (currentValue) => {
        if (this.state.value === currentValue) {
            return;
        }
        this.setState({
            value: currentValue
        });
    }

    reserved = () => {
        let self = this;
        let stockNote = this.input.state.value;
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        }
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLots : materialLots,
            stockNote : stockNote,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                    self.setState({
                        value: ""
                    });
                    self.input.setState({
                        value: ""
                    });
                }
                MessageUtils.showOperationSuccess();
            }
        }
        ReservedManagerRequest.sendHNwarehouseOtherShipReserved(requestObj);
    }

    autoMaticPack = () => {
        let self = this;
        let rowKey = this.props.rowKey || DefaultRowKey;
        const {data} = this.state;
        let packageRule = this.state.value;
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        }
        if (data.length === 0 ) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(packageRule == "" || packageRule == undefined || packageRule == null){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChoosePackedRule));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLots : data,
            packageRule: packageRule,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                materialLotList.forEach(materialLot => {
                    self.setSelectMLot(materialLot);
                    data.forEach(mLot => {
                        if(mLot[rowKey] === materialLot[rowKey]){
                            let dataIndex = data.indexOf(mLot);
                            if (dataIndex > -1 ) {
                                data.splice(dataIndex, 1);
                            }
                            data.unshift(materialLot);
                        }
                    });
                });
            }
        }
        ReservedManagerRequest.sendGetReservedMLotByPackageRule(requestObj);
    }

    setSelectMLot = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex < 0) {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    createMissZeroQty = () => {
        const {selectedRows} = this.state;
        let unreservedQty = this.props.unReservedQty;
        if(unreservedQty == undefined || unreservedQty == null || unreservedQty == ""){
            unreservedQty = 0;
        }
        let materialLotList = selectedRows;
        let selectQty = 0;
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                selectQty = selectQty + data.currentQty;
            });
        }
        let missZeroQty = unreservedQty - selectQty;
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.MissZeroQty)}：{missZeroQty}</Tag>
    }

    createReserved = () => {
        return <Button key="reserved" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.reserved}>
                        备货
                    </Button>
    }
    createAutoMaticPacking = () => {
        return <Button key="autoMaticPack" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.autoMaticPack}>
                    {I18NUtils.getClientMessage(i18NCode.AutoMaticPacking)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
