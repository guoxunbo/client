import EntityListTable from "../EntityListTable";
import ProductSubcodeForm from "../../Form/ProductSubcodeForm";
import { Form } from "antd";

export default class GCProductSubcodeSetTable extends EntityListTable {

    static displayName = 'GCProductSubcodeSetTable';

    constructor(props) {
        super(props);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        return buttons;
    }

    createForm = () => {
        const WrappedAdvancedEntityForm = Form.create()(ProductSubcodeForm);
        return  <WrappedAdvancedEntityForm ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
}