import EntityScanViewTable from "../EntityScanViewTable";
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';
import RelayBoxStockInManagerRequest from "../../../api/gc/relayBox-stock-in/RelayBoxStockInManagerRequest";

/**
 *  扫描中转箱更换库位号
 */
export default class RelayBoxChangeStorageIdTable extends EntityScanViewTable {

    static displayName = 'RelayBoxChangeStorageIdTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockInButton());
        return buttons;
    }

    changeStroage = () => {
        debugger;
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

        let requestObject = {
            materialLots: data,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        RelayBoxStockInManagerRequest.sendRelayBoxChangeStorageRequest(requestObject);
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
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" onClick={this.changeStroage}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};