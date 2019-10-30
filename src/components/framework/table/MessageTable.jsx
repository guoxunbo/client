import EntityListTable from '@components/framework/table/EntityListTable';
import MessageRequest from '@api/message-manager/MessageRequest';
import MessageDialog from '@components/framework/dialog/MessageDialog';

export default class MessageTable extends EntityListTable {

    static displayName = 'MessageTable';

    handleDelete = (record) => {
        const self = this;
        let object = {
            values: record,
            success: function(responseBody) {
                self.refreshDelete(record);
            }
        };
        MessageRequest.sendDeleteRequest(object);
    } 
    

    createForm = () => {
        return  <MessageDialog object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

}
