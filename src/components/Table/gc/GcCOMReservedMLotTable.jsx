import { Button, Tag ,Input, Select} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';

/**
 * 备货表格
 */
export default class GcCOMReservedMLotTable extends EntityListCheckTable {

    static displayName = 'GcCOMReservedMLotTable';

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
        debugger;
        let self = this;
        let reservedOrderTable =  this.props.orderTable;
        let packedRuleList =[];
        let selectedValue = "";
        let options;
        if(reservedOrderTable){
            packedRuleList = reservedOrderTable.state.packedRuleList;
            selectedValue = reservedOrderTable.state.selectedValue;
        }
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
                value={selectedValue}
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
        if (this.props.orderTable.state.selectedValue === currentValue) {
            return;
        }
        this.props.orderTable.setState({ 
            selectedValue: currentValue
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

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLots : materialLots,
            stockNote : stockNote,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }

        ReservedManagerRequest.sendReserved(requestObj);
    }

    autoMaticPack = () => {
        debugger;
        let self = this;
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

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLots : data,
            packageRule: packageRule,
            success: function(responseBody) {

            }
        }
        ReservedManagerRequest.sendGetReservedMLotByPackageRule(requestObj);
    }

    createTotalNumber = () => {
        let materialLots = this.state.selectedRows;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.selectedRows.length}</Tag>
    }

    createMissZeroQty = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.MissZeroQty)}：{this.state.selectedRows.length}</Tag>
    }
    createReserved = () => {
        return <Button key="reserved" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.reserved}>
                        备货
                    </Button>
    }
    createAutoMaticPacking = () => {
        return <Button key="autoMaticPack" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.autoMaticPack}>
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
