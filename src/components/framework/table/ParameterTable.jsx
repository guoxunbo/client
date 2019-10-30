import EntityListTable from '@components/framework/table/EntityListTable';
import ParameterRequest from '@api/parameter-manager/ParameterRequest';
import ParameterDialog from '@components/framework//dialog/ParameterDialog';

export default class ParameterTable extends EntityListTable {

    static displayName = 'ParameterTable';

    handleDelete = (record) => {
        const self = this;
        let object = {
            values: record,
            success: function(responseBody) {
                self.refreshDelete(record);
            }
        };
        ParameterRequest.sendDeleteRequest(object);
    } 
    

    createForm = () => {
        return  <ParameterDialog object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
}
