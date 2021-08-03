import PackageValidationRequest from "@api/package-validation/PackageValidationRequest";
import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class PackageMLotForm extends MobileForm {
    static displayName = 'PackageMLotForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name == "materialLotId") {
            fieldEnter[queryField.name] = this.onLastFieldEnter;
        }
    }

    afterQuery = (responseBody) => {    
        if(responseBody.dataList.length == 0){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            this.resetFormFileds();
            return
        }
        //验证装箱规则
        this.validationPackgeRule(responseBody.dataList[0]);
    }

    validationPackgeRule(materialLot) {
        let self = this;
        let packageType = self.props.packageType;
        let {data} = self.props.dataTable.state;

        if (data.filter(d => d['materialLotId'] === materialLot['materialLotId']).length === 0){
            data.unshift(materialLot);
        }
        if (data.length == 0) {
            self.props.orderTable.setState({
                data: data,
            })
        } else {
            let requestObject = {
                packageType: packageType,
                materialLots: data,
                success: function() {
                    self.props.dataTable.setState({
                        data: data,
                    })
                    self.resetFormFileds();
                },
                fail: function() { 
                    data.shift();
                    self.props.dataTable.setState({
                        data: data,
                    })
                    self.resetFormFileds();
                }
            }
            PackageValidationRequest.sendValidationPackRequest(requestObject);
        }
    }

}

const WrappedPackageMLotForm = Form.create()(PackageMLotForm);
export {WrappedPackageMLotForm};

 