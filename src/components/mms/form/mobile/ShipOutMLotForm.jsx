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
        if (queryField.name === "materialLotId") {
            fieldEnter[queryField.name] = () => this.handleSearch();
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

 