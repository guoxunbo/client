import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class SplitMLotForm extends MobileForm {
    static displayName = 'SplitMLotForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name == "materialLotId") {
            fieldEnter[queryField.name] = this.onLastFieldEnter;
        }
    }

    afterQuery = (responseBody) => {
        let materialLot = responseBody.dataList[0];
        if (materialLot) {
            this.props.form.setFieldsValue(materialLot);
        } else {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            this.resetFormFileds();
        }
    }

}

const WrappedSplitMLotForm = Form.create()(SplitMLotForm);
export {WrappedSplitMLotForm};

 