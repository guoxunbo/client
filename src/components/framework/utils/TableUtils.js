import EntityManagerRequest from "@api/entity-manager/EntityManagerRequest";
import Table from "@api/dto/ui/Table";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import { Application } from "@api/Application";
import { DefaultRowKey } from "@const/ConstDefine";
import Field from "@api/dto/ui/Field";
import NoticeUtils from "@utils/NoticeUtils";
import { EditableTable } from "@components/framework/table/EditorTable";

/**
 * Table上一些公共方法的抽象
 * 因为防止互相依赖，故抽取出来的Utils类
 */
export default class TableUtils {
    
    static getDefaultTableState = (component) => {
        return {
            tableRrn: undefined,
            table: {fields: []},
            columns: [],
            rowClassName: (record, index) => {},
            pagination: Application.table.pagination,
            rowSelection: undefined,
            selectedRowKeys: component.props.selectedRowKeys || [],
            selectedRows: component.props.selectedRows || [],
            formVisible: false,
            editorObject: {},
            scrollX: undefined,
            scrollY: undefined,
            data: [],
            loading: true,
            parentReadOnly: false
        };
    }

    /**
     * 初始化表格。一般在componentDidMount中调用
     * @param component 对应组件，一般是this
     * @param whereClause 条件。如果条件存在则以该条件执行
     * @param tableName 具体的动态表名
     */
    static initTable = (component, whereClause, tableName) => {
        let self = this;
        let {tableRrn, pagination, scanAddFlag} = component.props;
        let sendByNameFlag = false;
        let initFlag = true;
        if (whereClause) {
            initFlag = false;
        }
        if (tableName) {
            sendByNameFlag = true;
        }
        let requestObject = {
            tableRrn: tableRrn,
            initFlag: initFlag,
            whereClause: whereClause,
            tableName: tableName,
            success: function(responseBody) {
                let table = responseBody.table;
                let columnData = self.buildColumn(component, table);
                let data = responseBody.dataList;
                if (scanAddFlag) {
                    data = [];
                }
                component.setState({
                    data: data,
                    table: table,
                    loading: false,
                    columns: columnData.columns,
                    scrollX: columnData.scrollX,
                    pagination: pagination ? pagination : Application.table.pagination,
                    rowClassName: (record, index) => component.getRowClassName(record, index),
                }); 
            }
        }
        if (sendByNameFlag) {
            TableManagerRequest.sendGetDataByNameRequest(requestObject);
        } else {
            TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        }
    }

    static buildOperation = (component, record) => {
        let operations = [];
        operations.push(component.buildEditButton(record));
        operations.push(component.buildDeletePopConfirm(record));
        return operations;
    }

    /**
     * 初始化Column
     * @param component 对应组件本身，一般是this
     * @param table NBTable的实列
     * @param tableName 具体的动态表名
     */
    static buildColumn = (component, table) => {
        const fields = table.fields;
        const {checkd} = component.state;
        const {editFlag, currentTreeNode} = component.props;
        let columns = [];
        let scrollX = 0;
        for (let field of fields) {
            // 传递table，记录每个filed对应真实的table数据。而不是只有一个tableRrn.省去后面查询
            table.refresh = component.refresh;
            field.table = table;
            let f = new Field(field);
            let column = f.buildColumn();
            if (column != null) {
                column.field = f;

                columns.push(column);
                scrollX += column.width;
            }
        }
        if (checkd) {
            scrollX += Application.table.checkBox.width;
        }
        let operationColumn;
        if (component instanceof EditableTable) {
            if (editFlag || currentTreeNode) {
                operationColumn = component.buildOperationColumn(scrollX);
            }
        } else {
            operationColumn = component.buildOperationColumn(scrollX);
        }
        if (operationColumn) {
            scrollX += operationColumn.width;
            columns.push(operationColumn);
        }
        return {
            columns: columns,
            scrollX: scrollX
        };
    }

    /**
     * 获取下一级TreeNode 
     */
    static getNextTreeNode = (component, currentTreeNode) => {
        const {treeList} = component.props;
        let nextTreeNode = undefined;
        if (treeList && currentTreeNode) {
            let nextTreeNodes = treeList.filter((tree) => tree.parentRrn == currentTreeNode.objectRrn);
            if (nextTreeNodes && nextTreeNodes.length > 0) {
                return nextTreeNodes[0];
            }
        }
        return nextTreeNode;
    }

    /**
     * 删除数据
     * @param component 对应组件，一般是this
     * @param records 需要删除的数据 如果数据是行内编辑数据，直接在表格添加一行进行编辑，但是还没做保存。直接删除的行为 会在record上打上'newFlag'标识
     */
    static handleDelete = (component, record) => {
        if (record.newFlag) {
            component.refreshDelete(record);
            return;
        }
        const {modelClass} = component.state.table;
        let object = {
            modelClass : modelClass,
            values: record,
            success: function(responseBody) {
                component.refreshDelete(record);
            }
        };
        EntityManagerRequest.sendDeleteRequest(object);
    } 

    /**
     * 点击编辑的时候进行显示Dialog
     * @param component 对应组件，一般是this
     * @param records 需要删除的数据
     * @param addFlag 是否新增
     */
    static openDialog = (component, record, addFlag, parentObject) => {
        if (addFlag) {
            const {fields} = component.state.table;
            record = Table.buildDefaultModel(fields, parentObject);
        }
        component.setState({
            formVisible : true,
            editorObject: record
        })
    }

    static closeDialog = (component) => {
        component.setState({
            formVisible: false
        })
    }

    /**
     * 刷新表格中编辑的数据
     * @param component 对应组件，一般是this
     * @param records 需要删除的数据
     */
    static refreshEdit = (component, responseData) => {
        let datas = component.state.data;
        let rowKey = component.props.rowKey || DefaultRowKey;

        let responseDatas = [];
        //支持批量刷新
        if (!(responseData instanceof Array)) {
            responseDatas.push(responseData);
        } else {
            responseDatas = responseData;
        }
        responseDatas.forEach((response) => {
            let dataIndex = -1;
            datas.map((data, index) => {
                if (data[rowKey] == response[rowKey]) {
                    dataIndex = index;
                }
            });
            if (dataIndex > -1) {
                datas.splice(dataIndex, 1, response);
            } else {
                // 新增的就放在第一位
                datas.unshift(response);
            }
        });
        component.setState({
            data: datas,
            formVisible: false,
            selectedRows: [],
            selectedRowKeys: []
        }) 
        NoticeUtils.showSuccess();
    }

    /**
     * 当页面数据发生变化的时候进行捕捉
     */
    static onChange = (component, pagination) => {
        var keys = Object.keys(pagination);
        if (keys.length === 0) {
            pagination = false;
        }
        component.setState({
            pagination: pagination
        });
    }

    /**
     * 刷新删除的数据
     * @param component 对应组件，一般是this
     * @param records 需要删除的数据
     */
    static refreshDelete = (component, records) => {
        let datas = component.state.data;
        let recordList = [];
        //支持批量删除
        if (!(records instanceof Array)) {
            recordList.push(records);
        } else {
            recordList = records;
        }
        recordList.forEach((record) => {
            let dataIndex = datas.indexOf(record);
            if (dataIndex > -1) {
                datas.splice(dataIndex, 1);
            }
        });
        component.setState({
            data: datas,
            selectedRows: [],
            selectedRowKeys: [],
            editingKey: ""
        })
        NoticeUtils.showSuccess();
    }

}