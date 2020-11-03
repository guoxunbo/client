import EntityListTable from "../EntityListTable";
import { Form } from "antd";
import ProductNumberRelationForm from "../../Form/ProductNumberRelationForm";
import MessageUtils from "../../../api/utils/MessageUtils";

export default class GCProductNumberRelationTable extends EntityListTable {

    static displayName = 'GCVBoxHoldSetTable';

    constructor(props) {
        super(props);
    }

    createForm = () => {
        const WrappedAdvancedEntityForm = Form.create()(ProductNumberRelationForm);
        return  <WrappedAdvancedEntityForm ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.handleSuccess} onCancel={this.handleCancel} />
    }

    handleSuccess = () => {
        this.setState({
            formVisible : false,
        });
        if (this.props.resetData) {
            this.props.onSearch();
        }
        MessageUtils.showOperationSuccess();
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};