import IncomingMaterialReceiveRequest from "@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest";
import {WrappedReceiveMLotByOrderForm} from "@components/mms/form/mobile/ReceiveMLotByOrderForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

export default class ReceiveMLotByOrderProperties extends MobileProperties{

    static displayName = 'ReceiveMLotByOrderProperties';
    
    buildMobileForm = () => {
        return (<WrappedReceiveMLotByOrderForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    handleSubmit = () => {
        let self = this;
        let materialLots = this.dataTable.getScanedRows();
        if (materialLots.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLotList: materialLots,
            documentId: materialLots[0].incomingDocId,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.showSuccess();
            }
        }
        IncomingMaterialReceiveRequest.sendReceiveRequest(requestObject);
    }

}
