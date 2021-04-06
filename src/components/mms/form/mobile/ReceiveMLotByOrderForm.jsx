import IncomingMaterialReceiveRequest from "@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest";
import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class ReceiveMLotByOrderForm extends MobileForm {
    static displayName = 'ReceiveMLotByOrderForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "docId") {
            fieldEnter[queryField.name] = () => this.docIdEnterEvent(queryField);
        }
    }

    docIdEnterEvent = (queryField) => {
        let queryFields = this.state.queryFields;
        let docId = this.props.form.getFieldsValue()[queryField.name];
        let self = this;
        let object = {
            documentId: docId,
            success: function(responseBody) {
                self.props.dataTable.setState({
                    data: responseBody.materialLotList
                });
            }
        }
        IncomingMaterialReceiveRequest.sendGetMaterialLot(object);
        if (queryFields && Array.isArray(queryFields)) {
            let dataIndex = queryFields.indexOf(queryField);
            this.nextElementFocus(dataIndex, queryFields);
        }
    }

    handleSearch = () => {
        let formObject = this.props.form.getFieldsValue();
        let tableData = this.props.dataTable.state.data;
        let scandMaterialLot = undefined;
        tableData.map((materialLot, index) => {
            if (materialLot.materialLotId == formObject.materialLotId && materialLot.currentQty == formObject.qty) {
                materialLot.scaned = true;
                scandMaterialLot = materialLot;
            }
        });
        if (!scandMaterialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        } else {
            this.props.dataTable.refreshWithoutNotice(scandMaterialLot);
        }
        this.props.form.setFieldsValue({
            materialLotId: "",
            qty: ""
        });
        document.getElementById("materialLotId").focus();
    }

}
const WrappedReceiveMLotByOrderForm = Form.create()(ReceiveMLotByOrderForm);
export {WrappedReceiveMLotByOrderForm};

 