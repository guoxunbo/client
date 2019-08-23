
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityListTable from './EntityListTable';
import { Notification } from '../notice/Notice';
import PackageMaterialLotRequest from '../../api/package-material-lot/PackageMaterialLotRequest';
import MessageUtils from '../../api/utils/MessageUtils';

/**
 * 所有扫描条件添加数据的父类
 *  不具备操作按钮，具备删除按钮。删除按钮只是删除表格数据，而非删除数据库数据
 */
export default class EntityScanViewTable extends EntityListTable {

    static displayName = 'EntityScanViewTable';

    createButtonGroup = () => {
        
    }

    handleDelete = (record) => {
        this.refreshDelete(record);
    } 

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

}
