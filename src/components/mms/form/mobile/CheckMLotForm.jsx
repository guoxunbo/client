import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class CheckMLotForm extends MobileForm {

    static displayName = 'CheckMLotForm';

    customFieldEnterEvent = (queryField, fieldEnterEvents) => {
        if (queryField.name === "materialLotId") {
            fieldEnterEvents[queryField.name] = () => this.mLotIdEnterEvent(queryField);
        }
        if (queryField.name === "transQty") {
            fieldEnterEvents[queryField.name] = () => this.actualQtyEnterEvent(queryField);
        }

  }
        
    mLotIdEnterEvent = (queryField) =>{
        let materialLotId =  this.props.form.getFieldValue(queryField.name);
        if(!materialLotId){
            return;
        }
        let queryFields = this.state.queryFields;
        if (queryFields && Array.isArray(queryFields)) {
            let dataIndex = queryFields.indexOf(queryField);
            this.nextElementFocus(dataIndex, queryFields);
        }
    }

    actualQtyEnterEvent = (queryField)=>{
        let transQty = this.props.form.getFieldValue(queryField.name);
        if(!transQty){
           return;
        }
        let objectFrom = this.props.form.getFieldsValue();
        let {data} = this.props.dataTable.state;
        let scandMaterialLot = undefined;
        let showData = [];
        data.map((mLot, index) => {
            if (mLot.materialLotId == objectFrom.materialLotId) {
                mLot.transQty = transQty;
                mLot.scaned = true;
                if(mLot.currentQty != transQty){
                    mLot.errorFlag = true;
                }else{
                    mLot.errorFlag = false;
                }
                scandMaterialLot = mLot;
            }else if (mLot.materialLotId != objectFrom.materialLotId && mLot.errorFlag){
                showData.unshift(mLot);
            }else {
                showData.push(mLot);
            }
        });
        if (!scandMaterialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (objectFrom.materialLotId || ""));
        }else{
            showData.unshift(scandMaterialLot);
        }
        this.props.dataTable.setState({
            data: showData,
            loading: false,
        });
        this.props.form.setFieldsValue({
            materialLotId: undefined,
            transQty: undefined
         });
         document.getElementById("materialLotId").focus();
    }

}
const WrappedCheckMLotForm = Form.create()(CheckMLotForm);
export {WrappedCheckMLotForm};

 