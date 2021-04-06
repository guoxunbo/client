import MaterialLotManagerRequest from "@api/material-lot-manager/MaterialLotManagerRequest";
import {WrappedSplitMLotForm} from "@components/mms/form/mobile/SplitMLotForm";
import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";

export default class PrintMaterialLotProperties extends MobileProperties{

    static displayName = 'PrintMaterialLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedSplitMLotForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    handleSubmit = () => {
        let self = this;
        let value = this.mobileForm.getFieldsValue();
        let requestObject = {
            materialLot: value,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.showSuccess();
            }
        }
        MaterialLotManagerRequest.sendPrintMaterialLotRequest(requestObject);
    }

}
