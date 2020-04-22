import {Button} from 'antd';
import { i18NCode } from "@const/i18n";
import I18NUtils from "@api/utils/I18NUtils";
import IconUtils from '@utils/IconUtils';
import EntityListVersionControlTable from '@components/framework/table/EntityListVersionControlTable';
import EqpRecipeDialog from '@components/rms/dialog/EqpRecipeDialog';
import EqpRecipeRequest from '@api/rms/eqp-recipe-manager/EqpRecipeRequest';
import AuthorityButton from '@components/framework/button/AuthorityButton';
import EqpSubRecipeTable from './EqpSubRecipeTable';

export default class EqpRecipeTable extends EntityListVersionControlTable {

    static displayName = 'EqpRecipeTable';

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

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDownloadButton());

        buttons.push(this.createAddButton());
        buttons.push(this.createUnForzenOrForzenButton());
        buttons.push(this.createActiveOrInActiveButton());
        buttons.push(this.createGoldenButton());
        return buttons;
    }

    createDownloadButton = () => {
        return <AuthorityButton i18NCode={"下达"} key="add" type="primary" className="table-button" icon="download" onClick={() => this.handleAdd()}/>
    }

    createGoldenButton = () => {
        return <AuthorityButton i18NCode={"Golden"} key="add" type="primary" className="table-button" icon="plus" onClick={() => this.handleAdd()}/>
    }
    
    createEntitySubTreeTable = (record, currentTreeNode) => {
        const {treeList} = this.props;
        return <EqpSubRecipeTable currentTreeNode={currentTreeNode} treeList={treeList} parentObject={record}/>
    }

    handleActive = () => {
        const self = this;
        const {selectedRows}  = this.state;
        let object = {
            values: selectedRows[0],
            success: function(responseBody) {
                let dataList = [];
                let data = responseBody.recipeEquipment;
                dataList.push(data);
                if (data.effectObject) {
                    dataList.push(data.effectObject);
                } 
                self.refresh(dataList);
            }
        };
        EqpRecipeRequest.sendActiveRequest(object);
    }

    createForm = () => {
        return  <EqpRecipeDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
    
}
