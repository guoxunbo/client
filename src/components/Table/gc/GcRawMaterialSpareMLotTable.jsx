import EntityListCheckTable from '../EntityListCheckTable';
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import GCRawMaterialImportRequest from '../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest';

export default class GcRawMaterialSpareMLotTable extends EntityListCheckTable {

    static displayName = 'GcRawMaterialSpareMLotTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.spareMaterialButton());
        buttons.push(this.spareMaterialConfirmButton());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createStatistic());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createMissZeroQtyTag());
        
        return tagList;
    }

    spareMaterialConfirm = () => {
        let self = this;
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        }

        let materialLotList = this.getSelectedRows();
        if (materialLotList.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLotList : materialLotList,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        GCRawMaterialImportRequest.sendSpareRawMLotByDocLine(requestObj);
    }

    spareMaterial = () => {
        let self = this;
        let rowKey = this.props.rowKey || DefaultRowKey;
        const {data} = this.state;
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

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLotList : data,
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
        GCRawMaterialImportRequest.sendGetSpareRawMLotByDocLine(requestObj);
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

    createMissZeroQtyTag = () => {
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

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}:{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count}</Tag>
    }

    spareMaterialButton = () => {
        return <Button key="spareMaterial" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.spareMaterial}>
                   {I18NUtils.getClientMessage(i18NCode.BtnSpareMaterial)}
                    </Button>
    }

    spareMaterialConfirmButton = () => {
        return <Button key="spareMaterialConfirm" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.spareMaterialConfirm}>
                   {I18NUtils.getClientMessage(i18NCode.BtnSpareMaterialConfirm)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
