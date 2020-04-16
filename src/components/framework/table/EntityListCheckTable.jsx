import EntityListTable from "@components/framework/table/EntityListTable";
import {Application} from '@api/Application'
import { DefaultRowKey } from "@api/const/ConstDefine";

/**
 * 具有选择框的table。不具备操作列
 */

export default class EntityListCheckTable extends EntityListTable {

    static displayName = 'EntityListCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, checked: true}
    }

    /**
     * 默认的table框的选择框属性
     */
    getRowSelection = (selectedRowKeys) => {
        const rowSelection = {
            columnWidth: Application.table.checkBox.width,
            fixed: true,
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                })
            }
        }
        return rowSelection;
    }

    selectRow = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex >= 0) {
            selectedRowKeys.splice(checkIndex, 1);
            selectedRows.splice(checkIndex, 1);
        } else {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

}