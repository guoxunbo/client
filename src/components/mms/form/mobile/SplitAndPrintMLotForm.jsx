import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MobileForm from "@components/framework/form/MobileForm";
import SqlUtils from "@components/framework/utils/SqlUtils";
import { Form } from "antd";

export default class SplitAndPrintMLotForm extends MobileForm {
    static displayName = 'SplitAndPrintMLotForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {  
        if (queryField.name == "incomingDocId") {
            fieldEnter[queryField.name] = this.onLastFieldEnter;
        }
        if (queryField.name == "materialName") {
            fieldEnter[queryField.name] = this.onLastFieldEnter;
        }
    }

    handleSearch = () => {
        var self = this;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values['standardQty'] = '';
            let whereClause = SqlUtils.buildWhereClause(this.state.queryFields, values);
            let requestObject = {
                tableRrn: this.state.tableRrn,
                whereClause: whereClause,
                success: function(responseBody) {
                  self.afterQuery(responseBody);
                }
              }
              TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        });
    }

    afterQuery = (responseBody) => {
        this.props.dataTable.setState({
            data: responseBody.dataList,
            pagination:false
        })
    }

}

const WrappedSplitAndPrintMLotForm = Form.create()(SplitAndPrintMLotForm);
export {WrappedSplitAndPrintMLotForm};

 