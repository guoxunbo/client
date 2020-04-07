import {Button} from 'antd';
import { i18NCode } from "@const/i18n";
import I18NUtils from "@api/utils/I18NUtils";
import EntityListTable from "@components/framework/table/EntityListTable";
import IconUtils from '@utils/IconUtils';

export default class EquipmentTable extends EntityListTable {

    static displayName = 'EquipmentTable';

    getRecipeList = () => {
        //TODO 后续在请求。
    }

    createGetRecipeListButton = () => {
        return <Button key="dispatchAutority" type="primary" className="table-button" icon={IconUtils.buildIcon("icon-huoqu")} onClick={() => this.getRecipeList()}>
                    {I18NUtils.getClientMessage(i18NCode.BtnGetRecipe)}
            </Button>
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createGetRecipeListButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

}
