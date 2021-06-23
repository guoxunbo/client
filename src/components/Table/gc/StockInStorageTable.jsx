
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Upload } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import StockInManagerRequest from '../../../api/gc/stock-in/StockInManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';
import EventUtils from '../../../api/utils/EventUtils';

/**
 * 入库
 */
export default class StockInStorageTable extends EntityScanViewTable {

    static displayName = 'StockInStorageTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createImportButton());
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

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
       
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

    handlesUpload = (option) => {
        const self = this;
        const {data} = this.state;

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let object = {
            success: function(responseBody) {
                self.setState({
                    loading: false
                });
               MessageUtils.showOperationSuccess();
            }
        }
        StockInManagerRequest.sendImportRequest(object, option.file);
    }

    createImportButton = () => {
        return (<Upload key="import" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.handlesUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} >{I18NUtils.getClientMessage(i18NCode.BtnImp)}</Button>
                </Upload>);
    }

    createStockInButton = () => {
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
