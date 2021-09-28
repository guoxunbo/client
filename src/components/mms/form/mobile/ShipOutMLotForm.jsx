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
export default class ShipMLotForm extends MobileForm {
    static displayName = 'ShipMLotForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "lineId") {
            fieldEnter[queryField.name] = () => this.docIdEnterEvent(queryField);
        }
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
                    let documentLines = responseBody.dataList;
                    if(!documentLines || documentLines.length == 0){
                        NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
                        return
                    }
                    let object = {
                        docLineId: documentLines[0].lineId,
                        success: function(responseBody) {
                            let data = responseBody.materialLots;
                            let waitShipMLot = [];
                            if(data){
                                waitShipMLot = data;
                            }
                            self.props.dataTable.setState({data: waitShipMLot});
                            let queryFields = self.state.queryFields;
                            if (queryFields && Array.isArray(queryFields)) {
                                let dataIndex = queryFields.indexOf(queryField);
                                self.nextElementFocus(dataIndex, queryFields);
                            }
                        }
                    }
                    VcStockOutRequest.sendGetMaterialLot(object);
                }
              }
              TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        });
        
        
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
            this.props.dataTable.setState({data: showData});
        }
        this.props.form.setFieldsValue({materialLotId:"",});
        
        document.getElementById("materialLotId").focus();
    }
}

const WrappedShipMLotForm = Form.create()(ShipMLotForm);
export {WrappedShipMLotForm};

 