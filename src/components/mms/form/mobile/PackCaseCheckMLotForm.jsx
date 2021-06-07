import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class PackCaseCheckMLotForm extends MobileForm {
    static displayName = 'PackCaseCheckMLotForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "boxMaterialLotId") {
            fieldEnter[queryField.name] = () => this.boxMLotIdEnterEvent(queryField);
        }
        if (queryField.name === "materialLotId") {
            fieldEnter[queryField.name] = () => this.mLotIdEnterEvent(queryField);
        }
    }

    boxMLotIdEnterEvent = (queryField) =>{
        this.handleSearch();
        let queryFields = this.state.queryFields;

        this.resetFormFileds();
        if (queryFields && Array.isArray(queryFields)) {
            let dataIndex = queryFields.indexOf(queryField);
            this.nextElementFocus(dataIndex, queryFields);
        }
    }

    mLotIdEnterEvent = () => {
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

        this.props.form.setFieldsValue({materialLotId: ""});
        document.getElementById("materialLotId").focus();
    }

    onLastFieldEnter = () => {

    }

    afterQuery = (responseBody) => {
        if (responseBody.dataList) {
            let  data = responseBody.dataList;
            this.props.dataTable.setState({
                data: data,
            })
        } else {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            this.resetFormFileds();
        }
    }


    onLastFieldEnter = () => {
        
    } 
}

const WrappedPackCaseCheckMLotForm = Form.create()(PackCaseCheckMLotForm);
export {WrappedPackCaseCheckMLotForm};

 