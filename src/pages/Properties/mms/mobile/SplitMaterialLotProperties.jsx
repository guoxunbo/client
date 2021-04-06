import StandardSplitMLotRequest from "@api/mms/standard-split/StandardSplitMLotRequest";
import {WrappedSplitMLotForm} from "@components/mms/form/mobile/SplitMLotForm";
import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";

export default class SplitMaterialLotProperties extends MobileProperties{

    static displayName = 'SplitMaterialLotProperties';
    
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
        console.log(this.mobileForm);
        let value = this.mobileForm.getFieldsValue();
        debugger;
        console.log(value);
        let requestObject = {
            materialLotId: value.materialLotId,
            standardQty: value.standardQty,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.showSuccess();
            }
        }
        StandardSplitMLotRequest.sendStandardSplitReuqest(requestObject);
    }

}
