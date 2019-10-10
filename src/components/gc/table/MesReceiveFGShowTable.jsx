import EntityListTable from '@components/framework/table/EntityListTable';

/**
 * 成品显示
 */
export default class MesReceiveFGShowTable extends EntityListTable {

    static displayName = 'MesReceiveFGShowTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}
