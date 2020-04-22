
import EqpRecipeDialog from '@components/rms/dialog/EqpRecipeDialog';
import EqpRecipeRequest from '@api/rms/eqp-recipe-manager/EqpRecipeRequest';
import EntitySubTreeTable from '@components/framework/table/EntitySubTreeTable';

export default class EqpSubRecipeTable extends EntitySubTreeTable {

    static displayName = 'EqpSubRecipeTable';

    createEntitySubTreeTable = (record, currentTreeNode) => {
        const {treeList} = this.props;
        return <EqpSubRecipeTable currentTreeNode={currentTreeNode} treeList={treeList} parentObject={record}/>
    }

    handleDelete = (record) => {
        const self = this;
        let object = {
            values: record,
            success: function(responseBody) {
                self.refreshDelete(record);
            }
        };
        EqpRecipeRequest.sendDeleteRequest(object);
    } 

    createForm = () => {
        return  <EqpRecipeDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
    
}
