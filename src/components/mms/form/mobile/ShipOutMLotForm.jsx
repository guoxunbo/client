import VcStockOutRequest from "@api/vc/stock-out-manager/VcStockOutRequest";
import MobileForm from "@components/framework/form/MobileForm";
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
        if (queryField.name === "docId") {
            fieldEnter[queryField.name] = () => this.docIdEnterEvent(queryField);
        }
    }

    docIdEnterEvent = (queryField) => {
        let queryFields = this.state.queryFields;
        let docLineId = this.props.form.getFieldsValue()[queryField.name];
        let self = this;
        let object = {
            docLineId: docLineId,
            success: function(responseBody) {
                let data = responseBody.materialLots;
                let unShipMLot = [];
                data.map((materialLot, index)=>{
                    if(materialLot.status != 'Ship'){unShipMLot.unshift(materialLot)}
                })
                self.props.dataTable.setState({data: unShipMLot});
            }
        }
        VcStockOutRequest.sendGetMaterialLot(object);
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
            this.props.dataTable.setState({data: showData});
        }
        this.props.form.setFieldsValue({materialLotId:"",});
        
        document.getElementById("materialLotId").focus();
    }
}

const WrappedShipMLotForm = Form.create()(ShipMLotForm);
export {WrappedShipMLotForm};

 