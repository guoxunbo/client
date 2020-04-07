import {Button} from 'antd';
import { i18NCode } from "@const/i18n";
import I18NUtils from "@api/utils/I18NUtils";
import IconUtils from '@utils/IconUtils';
import EntityListVersionControlTable from '@components/framework/table/EntityListVersionControlTable';
import EqpRecipeDialog from '@components/rms/dialog/EqpRecipeDialog';

export default class EqpRecipeTable extends EntityListVersionControlTable {

    static displayName = 'EqpRecipeTable';

    createForm = () => {
        return  <EqpRecipeDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
    
}
