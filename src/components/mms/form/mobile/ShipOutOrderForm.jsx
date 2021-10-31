import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import VcStockOutRequest from "@api/vc/stock-out-manager/VcStockOutRequest";
import MobileForm from "@components/framework/form/MobileForm";
import SqlUtils from "@components/framework/utils/SqlUtils";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

/**
 * 发货
 */
export default class ShipOutOrderForm extends MobileForm {

    static displayName = 'ShipOutOrderForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "reserved7") {
            fieldEnter[queryField.name] = () => this.handleSearch(queryField);
        }

        if (queryField.name === "lineId") {
            fieldEnter[queryField.name] = () => this.docIdEnterEvent(queryField);
        }
    }

    handleSearch = (queryField) => {
        var self = this;
        let whereClause = SqlUtils.buildWhereClause(this.state.queryFields, this.props.form.getFieldsValue());
        let requestObject = {
            tableRrn: this.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
                let showData = [];
                if(responseBody.dataList){
                    showData = responseBody.dataList;
                }
                self.props.dataTable.setState({
                    data: showData,
                })
            }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    docIdEnterEvent = (queryField) => {
        let self = this;
        this.props.form.validateFields((err, values) =>{
            if(err){
                return;
            }
            let whereClause = SqlUtils.buildWhereClause(this.state.queryFields, values);
            let requestObject = {
                tableRrn: this.state.tableRrn,
                whereClause: whereClause,
                success: function(responseBody) {
                    let showData = [];
                    if(responseBody.dataList){
                        showData = responseBody.dataList;
                    }
                    self.props.dataTable.setState({
                        data: showData,
                    })
                    if(!showData || showData.length == 0){
                        NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
                        return
                    }
                    
                    self.props.dataTable.getMaterialLot(showData[0]);
                }
              }
              TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        });
    }
}

const WrappedShipOutOrderForm = Form.create()(ShipOutOrderForm);
export {WrappedShipOutOrderForm};

 