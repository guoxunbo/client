import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import MobileForm from "@components/framework/form/MobileForm";
import { Form } from "antd";

export default class MLotTransferInvForm extends MobileForm {
    static displayName = 'MLotTransferInvForm';

    onLastFieldEnter = () => {
        
    } 

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "materialLotId") {
            fieldEnter[queryField.name] = () => this.materialLotIdEnterEvent(queryField);
        }

        if (queryField.name === "fromStorageId") {
            fieldEnter[queryField.name] = () => this.fromStorageIdEnterEvent(queryField);
        }

        if (queryField.name === "mLotId") {
            fieldEnter[queryField.name] = () => this.mLotIdEnterEvent(queryField);
        }

        if (queryField.name === "targetStorageId") {
            fieldEnter[queryField.name] = () => this.targetStorageIdEnterEvent(queryField);
        }
    }

    materialLotIdEnterEvent = (queryField) => {
        document.getElementById("fromStorageId").focus();
    }
   
    fromStorageIdEnterEvent = (queryField) => {
        let self = this;

        let formObject = this.props.form.getFieldsValue();
        let tableData = this.props.dataTable.state.data;
        let object = {
            materialLotId: formObject.materialLotId,
            fromStorageId: formObject.fromStorageId,
            success: function(responseBody) {
                let showData = [];
                let flag = true;
                //如果存在 拿出来重写放入
                tableData.map((d, index)=>{
                    if(d.materialLotId == formObject.materialLotId){
                        d.fromStorageId = formObject.fromStorageId;
                        showData.unshift(d);
                        flag = false;
                    }else{
                        showData.push(d);
                    }
                })
                if(flag){
                    showData.unshift(formObject);
                }
                self.props.dataTable.setState({
                    data: showData,
                    pagination: false
                });
            }
        }
        MobileRequest.vailadateFromWarehouse(object);

        this.props.form.resetFields();
        document.getElementById("materialLotId").focus();
    }

    mLotIdEnterEvent = (queryField) => {
        document.getElementById("targetStorageId").focus();
    }

    targetStorageIdEnterEvent = (queryField) => {
        let self = this;
        let formObject = this.props.form.getFieldsValue();
        let tableData = this.props.dataTable.state.data;
        let object = {
            materialLotId: formObject.mLotId,
            targetStorageId: formObject.targetStorageId,
            success: function(responseBody) {
                let showData = [];
                let flag = true;
                //如果存在 拿出来重写放入
                tableData.map((d, index)=>{
                    if(d.materialLotId == formObject.mLotId){
                        d.targetStorageId = formObject.targetStorageId;
                        showData.unshift(d);
                    }else{
                        showData.push(d);
                    }
                })
                self.props.dataTable.setState({
                    data: showData,
                    pagination: false
                });
            }
        }
        MobileRequest.sendVailadateTargetWarehouse(object);

        this.props.form.resetFields();
        document.getElementById("mLotId").focus();
    }

}

const WrappedMLotTransferInvForm = Form.create()(MLotTransferInvForm);
export {WrappedMLotTransferInvForm};

 