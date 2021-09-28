import EntityManagerRequest from "@api/entity-manager/EntityManagerRequest";
import { WrappedUpdateMLotForm } from "@components/mms/form/mobile/UpdateMLotForm";
import MobileProperties from "@properties/framework/MobileProperties";
import NoticeUtils from "@utils/NoticeUtils";
import { DateFormatType } from '@api/const/ConstDefine';

export default class UpdateMLotProperties extends MobileProperties{

    static displayName = 'UpdateMLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedUpdateMLotForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form} 
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table} />);
  }
        
    handleSubmit = () => {
        var self = this;
        let {formObject} = self.form.state;
        let fieldsValue = self.mobileForm.getFieldsValue();
        
        if(fieldsValue.productionDate){
          formObject.productionDate = fieldsValue.productionDate.format(DateFormatType.Date);
        }else{
          formObject.productionDate = null;
        }
        formObject.reserved46 = fieldsValue.reserved46;
        let object = {
            modelClass: this.state.table.modelClass,
            values: formObject,
            tableRrn: this.state.tableRrn,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.mobileShowSuccess();
            }
        };
        EntityManagerRequest.sendMergeRequest(object);
    }
}
