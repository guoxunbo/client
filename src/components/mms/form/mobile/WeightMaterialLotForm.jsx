import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class WeightMaterialLotForm extends MobileForm {
    static displayName = 'WeightMaterialLotForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "materialLotId") {
            fieldEnter[queryField.name] = () => this.mLotIdEnterEvent();
        }
    }

    mLotIdEnterEvent = () => {
        this.handleSearch();
    }

    onLastFieldEnter = () => {

    }

    afterQuery = (responseBody) => {
        if (responseBody.dataList[0]) {
            let  materialLot = responseBody.dataList[0];
            this.props.form.setFieldsValue({
                materialLotId: materialLot.materialLotId,
                boxMaterialLotId: materialLot.boxMaterialLotId,
            });
        } else {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            this.resetFormFileds();
        }
    }


    onLastFieldEnter = () => {
        
    } 
}

const WrappedWeightMaterialLotForm = Form.create()(WeightMaterialLotForm);
export {WrappedWeightMaterialLotForm};

 