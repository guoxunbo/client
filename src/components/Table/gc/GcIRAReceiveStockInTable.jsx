
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import StockInManagerRequest from '../../../api/gc/stock-in/StockInManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';

export default class GcIRAReceiveStockInTable extends EntityScanViewTable {

    static displayName = 'GcIRAReceiveStockInTable';

    getRowClassName = (record, index) => {
        if (record.scanSecondFlag) {
            return 'check-row'
        } else if (record.scanFlag) {
            return 'new-row';
        } else if(record.errorFlag){
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockInButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createMaterialLotsNumber());
        tags.push(this.createTotalNumber());
        tags.push(this.createErrorNumberStatistic());
        tags.push(this.createRepeatScanNumberStatistic());
        return tags;
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createRepeatScanNumberStatistic = () => {
        return <Tag color="#001aff">{I18NUtils.getClientMessage(i18NCode.RepeatScanNumber)}：{this.getRepeatScanCount()}</Tag>
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty*10000;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count/10000}</Tag>
    }

    stockIn = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if (self.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }

        if (self.getRepeatScanCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.MaterialLotIdRepeat));
            return;
        }

        if(!this.validationStorageId(data)) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.StorageCannotEmpty));
            return;
        }
        
        let result = this.twoScanIRAvalidation(data);
        if(result != ""){
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.RawMaterialMustBeTwoScanValidate)+ ":" + result);
            return;
        }
       
        let requestObject = {
            materialLots: data,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        StockInManagerRequest.sendStockInRequest(requestObject);
    }

    twoScanIRAvalidation = (data) =>{
        let result = "";
        data.forEach((materialLot) => {
            if(materialLot.materialType == "IRA" && materialLot.scanFlag == undefined){
                result = materialLot.materialLotId;
                return result;
            }
        });
        return result;
    }
    
    validationStorageId = (data) =>{
        let flag = true;
        data.forEach((materialLot) => {
            if( materialLot.storageId == undefined){
                flag = false;
                return flag;
            }
        });
        return flag;
    }

    getErrorCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.errorFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    getRepeatScanCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.scanSecondFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    createStockInButton = () => {
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

    refreshDelete = (records) => {
        let datas = this.state.data;
        let recordList = [];
        if (!(records instanceof Array)) {
            let lotId = records.lotId;
            datas.forEach((item) => {
                if(item.lotId == lotId){
                    recordList.push(item);
                }
            });
        } else {
            recordList = records;
        }
        recordList.forEach((record) => {
            let dataIndex = datas.indexOf(record);
            if (dataIndex > -1 ) {
                datas.splice(dataIndex, 1);
            }
        });
        this.setState({
            data: datas,
            selectedRows: [],
            selectedRowKeys: []
        })
        MessageUtils.showOperationSuccess();
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
