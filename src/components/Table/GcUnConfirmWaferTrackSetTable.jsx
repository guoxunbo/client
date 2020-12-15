import MessageUtils from '../../api/utils/MessageUtils';
import EntityListTable from './EntityListTable';
import GCUnConfirmWaferTrackSetForm from './gc/GCUnConfirmWaferTrackSetForm';


export default class GcUnConfirmWaferTrackSetTable extends EntityListTable {

    static displayName = 'GcUnConfirmWaferTrackSetTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

    createForm = () => {
        return  <GCUnConfirmWaferTrackSetForm visible={this.state.formVisible} 
                                     width={600}
                                     unConfirmWaferSet={this.state.editorObject}
                                     onOk={this.handleSuccess} 
                                     onCancel={this.handleCancel}/>
    }

    // createForm = () => {
    //     const WrappedAdvancedEntityForm = Form.create()(GCWaferSetForm);
    //     return  <WrappedAdvancedEntityForm ref={this.formRef}  object={this.state.editorObject} visible={this.state.formVisible} 
    //                                         table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    // }
    
    handleSuccess = () => {
        this.setState({
            formVisible : false,
        });
        if (this.props.resetData) {
            this.props.onSearch();
        }
        MessageUtils.showOperationSuccess();
    }

    handleCancel = (e) => {
        this.setState({
            formVisible: false,
        })
    }

}
