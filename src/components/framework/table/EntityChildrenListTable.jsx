import EntityListTable from '@components/framework/table/EntityListTable';
import EventUtils from '@api/utils/EventUtils';

/**
 * 子级表格。通常为根据上面一个表格选中的数据进行子级查询
 */
export default class EntityChildrenListTable extends EntityListTable {

    static displayName = 'EntityChildrenListTable';

    componentWillUnmount = () => {
        EventUtils.removeAllListener(EventUtils.getEventNames().ParentTableRowSelected);
    }

    componentDidMount = () => {
        TableUtils.initTable(this, undefined);
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ParentTableRowSelected, (sender, parentObject, rowKey) => this.onParentTabelRowSelected(sender, parentObject, rowKey));
    };

    onParentTabelRowSelected = (sender, parentObject, rowKey) => {
        console.log(sender);
        console.log(parentObject);
        console.log(rowKey);
    }

}
