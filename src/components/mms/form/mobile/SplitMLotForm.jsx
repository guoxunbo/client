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
        if (responseBody.dataList[0]) {
            this.props.form.setFieldsValue(responseBody.dataList[0]);
        }
    }

    // handleSearch = () => {
    //     let formObject = this.props.form.getFieldsValue();
    //     let tableData = this.props.dataTable.state.data;
    //     let scandMaterialLot = undefined;
    //     tableData.map((materialLot, index) => {
    //         if (materialLot.materialLotId == formObject.materialLotId && materialLot.currentQty == formObject.qty) {
    //             materialLot.scaned = true;
    //             scandMaterialLot = materialLot;
    //         }
    //     });
    //     if (!scandMaterialLot) {
    //         NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
    //     } else {
    //         this.props.dataTable.refreshWithoutNotice(scandMaterialLot);
    //     }
    //     this.props.form.setFieldsValue({
    //         materialLotId: "",
    //         qty: ""
    //     });
    //     document.getElementById("materialLotId").focus();
    // }

}
const WrappedSplitMLotForm = Form.create()(SplitMLotForm);
export {WrappedSplitMLotForm};

 