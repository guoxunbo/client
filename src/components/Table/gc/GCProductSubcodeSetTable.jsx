import EntityListTable from "../EntityListTable";
import ProductSubcodeForm from "../../Form/ProductSubcodeForm";
import { Form } from "antd";
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import IconUtils from '../../../api/utils/IconUtils';
import AsyncManagerRequest from "../../../api/gc/async-manager/AsyncManagerRequest";

export default class GCProductSubcodeSetTable extends EntityListTable {

    static displayName = 'GCProductSubcodeSetTable';

    constructor(props) {
        super(props);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSyncProductSubCodeButton());
        return buttons;
    }

    createSyncProductSubCodeButton = () => {
        return <Button key="sync" type="primary" onClick={() => this.syncProductSubcode()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnSyncProductSubcode)}</Button>;
    }

    syncProductSubcode  =() => {
        let asyncType = "AsyncProductSubcode";
        let object = {
            actionType : asyncType
        }
        AsyncManagerRequest.sendAsyncRequest(object);
    }

    //数据全部同步，不需要修改
    buildOperationColumn = () => {
        
    }

}