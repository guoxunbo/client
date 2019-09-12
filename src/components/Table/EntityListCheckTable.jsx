import EntityListTable from "./EntityListTable";
import Field from '../../api/dto/ui/Field';
import {Application} from '../../api/Application'
import { DefaultRowKey } from "../../api/const/ConstDefine";

/**
 * 具有选择框的table。不具备操作列
 */

export default class EntityListCheckTable extends EntityListTable {

    static displayName = 'EntityListCheckTable';

    constructor(props) {
        super(props);
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

    buildColumn = (table) => {
        let fields = table.fields;
        let columns = [];
        let scrollX = 0;
        for (let field of fields) {
            // 传递table，记录每个filed对应真实的table数据。而不是只有一个tableRrn.省去后面查询
            field.table = table;
            let f  = new Field(field);
            let column = f.buildColumn();
            if (column) {
                columns.push(column);
                scrollX += column.width;
            }
        }
        scrollX += Application.table.checkBox.width;
        let operationColumn = this.buildOperationColumn(scrollX);
        if (operationColumn) {
            scrollX += operationColumn.width;
            columns.push(operationColumn);
        }
        return {
            columns: columns,
            scrollX: scrollX
        };
    }
}