import EntityListTable from "../EntityListTable";
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import IconUtils from '../../../api/utils/IconUtils';
import AsyncManagerRequest from "../../../api/gc/async-manager/AsyncManagerRequest";

export default class GCProductModelConversionTable extends EntityListTable {

    static displayName = 'GCProductModelConversionTable';

    constructor(props) {
        super(props);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSyncProductModelConversionButton());
        return buttons;
    }

    createSyncProductModelConversionButton = () => {
        return <Button key="sync" type="primary" onClick={() => this.syncProductModel()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnSyncProductModel)}</Button>;
    }

    syncProductModel  =() => {
        let asyncType = "AsyncProductModel";
        let object = {
            actionType : asyncType
        }
        AsyncManagerRequest.sendAsyncRequest(object);
    }

    //数据全部同步，不需要修改
    buildOperationColumn = () => {
        
    }

}