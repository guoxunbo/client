import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import { WrappedStockMLotForm } from "@components/mms/form/mobile/StockMLotForm";
import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";

export default class StockOutMLotProperties extends MobileProperties{

    static displayName = 'StockOutMLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedStockMLotForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    handleSubmit = {this.handleSubmit}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    handleSubmit = () => {
        let self = this;
        let value = this.mobileForm.getFieldsValue();
        let requestObject = {
            materialLotId: value.materialLotId,
            storageId: value.storageId,
            success: function(responseBody) {
                self.handleReset();

                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        MobileRequest.sendStockOutRequest(requestObject);
    }

}
