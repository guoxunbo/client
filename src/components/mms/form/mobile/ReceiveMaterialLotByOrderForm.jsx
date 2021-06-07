import MobileForm from "@components/framework/form/MobileForm";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Form } from "antd";

export default class ReceiveMaterialLotByOrderForm extends MobileForm {
    static displayName = 'ReceiveMaterialLotByOrderForm';

    customFieldEnterEvent = (queryField, fieldEnter) => {
        if (queryField.name === "name") {
            fieldEnter[queryField.name] = () => this.docIdEnterEvent(queryField);
        }
    }

    docIdEnterEvent = (queryField) => {
        this.handleSearch();
    }

    afterQuery = (responseBody) => {
        if(this.props.dataTable){
            this.props.dataTable.setState({
                data: responseBody.dataList,
            })
        }
    }

}
const WrappedReceiveMaterialLotByOrderForm = Form.create()(ReceiveMaterialLotByOrderForm);
export {WrappedReceiveMaterialLotByOrderForm};

 