import StandardSplitMLotRequest from "@api/mms/standard-split/StandardSplitMLotRequest";
import {WrappedSplitMLotForm} from "@components/mms/form/mobile/SplitMLotForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
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
        let value = this.mobileForm.getFieldsValue();
        if(!value.standardQty){
            NoticeUtils.showNotice(I18NUtils.getClientMessage("标准数量不能为空"))
            return;
        }
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
