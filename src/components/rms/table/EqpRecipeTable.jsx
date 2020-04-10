import {Button} from 'antd';
import { i18NCode } from "@const/i18n";
import I18NUtils from "@api/utils/I18NUtils";
import IconUtils from '@utils/IconUtils';
import EntityListVersionControlTable from '@components/framework/table/EntityListVersionControlTable';
import EqpRecipeDialog from '@components/rms/dialog/EqpRecipeDialog';
import EqpRecipeRequest from '@api/rms/eqp-recipe-manager/EqpRecipeRequest';

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
