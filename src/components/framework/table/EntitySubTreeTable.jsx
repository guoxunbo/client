import  React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import Field from '@api/dto/ui/Field';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import { Application } from '@api/Application';
import { DefaultRowKey } from '@const/ConstDefine';
import TreeManagerRequest from '@api/framework/tree-manager/TreeManagerRequest';
import EntityDialog from '../dialog/EntityDialog';
import MessageUtils from '@utils/MessageUtils';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';

const EntitySubTreeTableId = "entity-sub-tree-table";

/**
 * 展开树形的表格。不能继承EntityListTabel。会产生循环依赖
 * 不具备buttonGroup
 */
export default class EntitySubTreeTable extends Component {
    static displayName = 'EntitySubTreeTable';

    constructor(props) {
        super(props);
        this.state = {
            tableRrn: undefined,
            table: {fields: []},
            columns: [],
            rowClassName: (record, index) => {},
            pagination: Application.table.pagination,
            rowSelection: undefined,
            selectedRowKeys: this.props.selectedRowKeys || [],
            selectedRows: this.props.selectedRows || [],
            formVisible: false,
            editorObject: {},
            scrollX: undefined,
            scrollY:undefined,
            data: [],
            loading: true,
            parentReadOnly: false
        };
    }
    
   
    componentWillReceiveProps = (props) => {
        let parentReadOnly = props.parentObject["readonly"];
        let data = this.isObjectReadOnly(this.state.data, parentReadOnly);
        this.setState({
                parentReadOnly: parentReadOnly,
                data: data
            });
        console.log(props.parentObject);
    }

    componentDidMount = () => {
        this.initTable();
    }

    isObjectReadOnly = (data, parentReadOnly) => {
        if (Array.isArray(data)) {
            data.forEach((d) => d["readonly"] = parentReadOnly);
        }
        return data;
    }

    initTable = () => {
        let self = this;
        const {currentTreeNode, parentObject} = this.props;
        debugger;
        let request = {
            treeNode: currentTreeNode,
            parentObject: parentObject,
            success: function(responseBody) {
                let treeNode = responseBody.treeNode;
                let table = treeNode.table;
                let columnData = self.buildColumn(table);
                let parentReadOnly = parentObject["readonly"];
                let data = self.isObjectReadOnly(treeNode.dataList, parentReadOnly);
                self.setState({
                    data: data,
                    table: table,
                    loading: false,
                    columns: columnData.columns,
                    scrollX: columnData.scrollX,
                    parentReadOnly: parentReadOnly
                }); 
            }
        }
        TreeManagerRequest.sendGetTreeDataRequest(request);
    }

    buildColumn = (table) => {
        let fields = table.fields;
        let columns = [];
        let scrollX = 0;
        for (let field of fields) {
            // 传递table，记录每个filed对应真实的table数据。而不是只有一个tableRrn.省去后面查询
            table.refresh = this.refresh;
            field.table = table;
            let f  = new Field(field);
            let column = f.buildColumn();
            if (column != null) {
                columns.push(column);
                scrollX += column.width;
            }
        }
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

    buildOperationColumn(scrollX) {
        let self = this;
        let oprationColumn = {
            key: "opration",
            title: I18NUtils.getClientMessage(i18NCode.Operation),
            dataIndex: "opration",
            align: "center",
            width: this.state.oprationColumnWidth || Application.table.oprationColumn.width,
            render: (text, record) => {
                return (
                    <div>
                       {self.buildOperation(record)} 
                    </div>
                );
            }
        };
        return oprationColumn;
    }

    handleEdit = (record) => {
        this.setState({
            formVisible : true,
            editorObject: record
        })
    }

    onChange = () => {
        this.setState({
            pagination: false
        });
    }

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

    buildEditButton = (record) => {
        return <Button key="edit" style={{marginRight:'1px'}} icon="edit" size="small" 
                        onClick={() => this.handleEdit(record)} 
                        disabled={this.state.parentReadOnly} href="javascript:;"/>
    }

    buildDeletePopConfirm = (record) => {
        return <Popconfirm key="delete" disabled={this.state.parentReadOnly} title={I18NUtils.getClientMessage(i18NCode.ConfirmDelete)} 
                            onConfirm={() => this.handleDelete(record)}>
                    <Button disabled={this.state.parentReadOnly} icon="delete" size="small" type="danger"/>
                </Popconfirm>;
    }
    
    handleDelete = (record) => {
        const self = this;
        let object = {
            modelClass : self.state.table.modelClass,
            values: record,
            success: function(responseBody) {
                self.refreshDelete(record);
            }
        };
        EntityManagerRequest.sendDeleteRequest(object);
    } 

    expandedRowRender = (record) => {
        const nextTreeNode = this.getNextTreeNode();
        return <EntitySubTreeTable currentTreeNode={nextTreeNode} parentObject={record}/>
    };

    /**
     * 获取下一级TreeNode 
     */
    getNextTreeNode = () => {
        const {treeList, currentTreeNode} = this.props;
        let nextTreeNode = undefined;
        if (treeList && currentTreeNode) {
            let nextTreeNodes = treeList.filter((tree) => tree.parentRrn == currentTreeNode.objectRrn);
            if (nextTreeNodes && nextTreeNodes.length > 0) {
                return nextTreeNodes[0];
            }
        }
        return nextTreeNode;
    }
    
    handleCancel = (e) => {
        this.setState({
            formVisible: false
        })
    }

    refreshDelete = (records) => {
        let datas = this.state.data;
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
        this.setState({
            data: datas,
            selectedRows: [],
            selectedRowKeys: []
        })
        MessageUtils.showOperationSuccess();
    }

    /**
     * 更新表格数据
     * @param responseData 
     */
    refresh = (responseData) => {
        var self = this;
        let datas = self.state.data;
        let rowKey = self.props.rowKey || DefaultRowKey;

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
        self.setState({
            data: datas,
            formVisible: false,
            selectedRows: [],
            selectedRowKeys: []
        }) 
        MessageUtils.showOperationSuccess();
    }

    createForm = () => {
        return  <EntityDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    render() {
        const {data, columns, scrollX, loading} = this.state;
        const nextTreeNode = this.getNextTreeNode();

        return (
          <div >
            <div>
                <Table  
                    ref= {el => this.table = el}
                    dataSource={data}
                    bordered
                    id={EntitySubTreeTableId}
                    pagination={false}
                    columns = {columns}
                    scroll = {{ x: scrollX, y: this.props.scrollY}}
                    rowKey = {this.props.rowKey || DefaultRowKey}
                    loading = {loading}
                    onChange= {this.onChange.bind(this)}
                    onRow={(record) => ({
                        onClick: () => {
                            // this.selectRow(record);
                        },
                    })}
                    expandedRowRender={nextTreeNode ? this.expandedRowRender.bind(this) : undefined}
                />
            </div>
            {this.createForm()}
          </div>
        );
    }

}
