
import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import StockInManagerRequest from '../../../api/gc/stock-in/StockInManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';

export default class RawMaterialStockInStorageTable extends EntityScanViewTable {

    static displayName = 'RawMaterialStockInStorageTable';

    getRowClassName = (record, index) => {
        if (record.scanFlag) {
            return 'new-row';
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
        buttons.push(this.createStatistic());
        buttons.push(this.createStockInButton());
        return buttons;
    }

    stockIn = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
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
            if(materialLot.materialType == "IRA" && materialLot.reserved8 != undefined && materialLot.scanFlag == undefined){
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

    createStockInButton = () => {
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
