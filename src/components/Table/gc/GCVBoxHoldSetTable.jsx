import EntityListTable from "../EntityListTable";
import { Form } from "antd";
import VBoxHoldSetForm from "../../Form/VBoxHoldSetForm";

export default class GCVBoxHoldSetTable extends EntityListTable {

    static displayName = 'GCVBoxHoldSetTable';

    constructor(props) {
        super(props);
    }

    createForm = () => {
        const WrappedAdvancedEntityForm = Form.create()(VBoxHoldSetForm);
        return  <WrappedAdvancedEntityForm ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        return buttons;
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};