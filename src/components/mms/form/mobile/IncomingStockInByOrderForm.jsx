import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MobileForm from "@components/framework/form/MobileForm";
import SqlUtils from "@components/framework/utils/SqlUtils";
import { Form } from "antd";

export default class IncomingStockInByOrderForm extends MobileForm {

    static displayName = 'IncomingStockInByOrderForm';

    customFieldEnterEvent = (queryField, fieldEnterEvents) => {
        if (queryField.name === "incomingDocId") {
            fieldEnterEvents[queryField.name] = () => this.incomingDocIdEnterEvent(queryField);
        }

        if (queryField.name === "targetStorageId") {
            fieldEnterEvents[queryField.name] = () => this.targetStorageIdEnterEvent(queryField);
        }
    }

    incomingDocIdEnterEvent = (queryField) => {
        let self = this;
        let whereClause = SqlUtils.buildWhereClause(this.state.queryFields, this.props.form.getFieldsValue());
        let requestObject = {
            tableRrn: this.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
                self.props.dataTable.setState({
                    data: responseBody.dataList
                });
            }
          }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);

        document.getElementById("materialLotId").focus();
    }

    targetStorageIdEnterEvent = (queryField) => {
        let self = this;
        let {data, rowKey} = this.props.dataTable.state;
        let formObject = this.props.form.getFieldsValue();
        //1.校验库位
        let object = {
            materialLotId: formObject.materialLotId,
            targetStorageId: formObject.targetStorageId,
            success: function(responseBody) {
                let showData = [];
                data.map((d, index)=>{
                    if(d.materialLotId == formObject.materialLotId){
                        d.targetStorageId = formObject.targetStorageId;
                        d.scaned = true;
                        showData.unshift(d);
                    }else{
                        showData.push(d);
                    }
                })
                self.props.dataTable.setState({
                    data: showData,
                });
                self.props.form.setFieldsValue({
                    materialLotId: "",
                    targetStorageId: ""
                });
                document.getElementById("materialLotId").focus();
            }
        }
        MobileRequest.sendVailadateTargetWarehouse(object);
    }

    onLastFieldEnter = () => {

    }
}

const WrappedIncomingStockInByOrderForm = Form.create()(IncomingStockInByOrderForm);
export {WrappedIncomingStockInByOrderForm};

 