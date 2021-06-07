import MobileForm from "@components/framework/form/MobileForm";
import { Form } from "antd";

export default class StockMLotForm extends MobileForm {
    static displayName = 'StockMLotForm';

    onLastFieldEnter = () => {
        let self = this;
        self.props.handleSubmit();
    } 
}

const WrappedStockMLotForm = Form.create()(StockMLotForm);
export {WrappedStockMLotForm};

 