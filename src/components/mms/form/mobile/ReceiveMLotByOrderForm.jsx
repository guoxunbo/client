import IncomingMaterialReceiveRequest from "@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest";
import StringBuffer from "@api/StringBuffer";
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

        if (queryField.name === "scanedQRCode") {
            fieldEnter[queryField.name] = () => this.QRCodeEnterEvent(queryField);
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

    QRCodeEnterEvent = (queryField) => {
        let queryFields = this.state.queryFields;
        let qrCode = this.props.form.getFieldsValue()[queryField.name];
        let tableData = this.props.dataTable.state.data;
        let showData = [];
        let scandMaterialLot = undefined;
        tableData.map((materialLot, index) => {
            let QRCode = this.QRCodeFormat(materialLot);
            if (QRCode === qrCode) {
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
            this.props.form.setFieldsValue({
                scanedQRCode:""
            });
            document.getElementById("scanedQRCode").focus();
        }
    }

    QRCodeFormat = (materialLot) => {
        let QRCode = new StringBuffer();
        //批次号
        QRCode.append(materialLot.materialLotId);
        QRCode.append(";");

        //版本号
        QRCode.append(materialLot.reserved3);
        QRCode.append(";");

        //control lot
        QRCode.append(materialLot.reserved4);
        QRCode.append(";");

        //数量
        QRCode.append(materialLot.currentQty);
        QRCode.append(";");

        //客户订单号
        QRCode.append(materialLot.reserved54);
        QRCode.append(";");

        //来料MRB
        QRCode.append(materialLot.reserved16);
        QRCode.append(";");

        //发货单位
        QRCode.append(materialLot.reserved17);
        return QRCode.toString();
    }

    handleSearch = () => {
        let formObject = this.props.form.getFieldsValue();
        let tableData = this.props.dataTable.state.data;
        let scandMaterialLot = undefined;
        let showData = [];
        tableData.map((materialLot, index) => {
            if (materialLot.materialLotId == formObject.materialLotId && materialLot.currentQty == formObject.qty) {
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
            qty: ""
        });
        document.getElementById("materialLotId").focus();
    }

}
const WrappedReceiveMLotByOrderForm = Form.create()(ReceiveMLotByOrderForm);
export {WrappedReceiveMLotByOrderForm};

 