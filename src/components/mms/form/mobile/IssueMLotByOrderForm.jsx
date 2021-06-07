import IssueOrderRequest from "@api/issue-order-manager/issue-lot-order/IssueOrderRequest";
import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class IssueMLotByOrderForm extends MobileForm {
    static displayName = 'IssueMLotByOrderForm';

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
        IssueOrderRequest.sendGetWaitMLotByOrderRequest(object);
        if (queryFields && Array.isArray(queryFields)) {
            let dataIndex = queryFields.indexOf(queryField);
            this.nextElementFocus(dataIndex, queryFields);
        }
    }

    handleSearch = () => {
        let formObject = this.props.form.getFieldsValue();
        let tableData = this.props.dataTable.state.data;
        let scandMaterialLot = undefined;
        let showData = [];
        tableData.map((materialLot, index) => {
            if (materialLot.materialLotId == formObject.materialLotId) {
                materialLot.scaned = true;
                scandMaterialLot = materialLot;
                showData.unshift(materialLot);
            }else {
                showData.push(materialLot);
            }
        });
        
        if (!scandMaterialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        } else {
            this.props.dataTable.setState({
                data: showData
            });
        }
        this.props.form.setFieldsValue({
            materialLotId: "",
        });
        document.getElementById("materialLotId").focus();
    }

}
const WrappedIssueMLotByOrderForm = Form.create()(IssueMLotByOrderForm);
export {WrappedIssueMLotByOrderForm};

 