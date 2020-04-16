import  React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import { Application } from '@api/Application';
import { DefaultRowKey } from '@const/ConstDefine';
import TreeManagerRequest from '@api/framework/tree-manager/TreeManagerRequest';
import EntityDialog from '../dialog/EntityDialog';
import TableUtils from '../utils/TableUtils';

const EntitySubTreeTableId = "entity-sub-tree-table";

/**
 * 展开树形的表格。不能继承EntityListTabel。会产生循环依赖
 * 不具备buttonGroup
 */
export default class EntitySubTreeTable extends Component {
    static displayName = 'EntitySubTreeTable';

    constructor(props) {
        super(props);
        this.state = {...TableUtils.getDefaultTableState(), parentReadOnly: false};
    }
   
    componentWillReceiveProps = (props) => {
        let parentReadOnly = props.parentObject["readonly"];
        let data = this.isObjectReadOnly(this.state.data, parentReadOnly);
        this.setState({
                parentReadOnly: parentReadOnly,
                data: data
            });
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
        let request = {
            treeNode: currentTreeNode,
            parentObject: parentObject,
            success: function(responseBody) {
                let treeNode = responseBody.treeNode;
                let table = treeNode.table;
                let columnData = TableUtils.buildColumn(self, table);
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

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(<Button key="add" disabled={this.props.parentObject["readonly"]} style={{marginRight:'1px', marginLeft:'10px'}} size="small" icon="plus" onClick={() => this.handleAdd()}  href="javascript:;"> {I18NUtils.getClientMessage(i18NCode.BtnAdd)}</Button>)
        return buttons;
    }

    handleAdd = () => {
        TableUtils.openDialog(this, undefined, true, this.props.parentObject);
    }

    buildOperationColumn() {
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
        TableUtils.openDialog(this, record);
    }

    onChange = () => {
        TableUtils.onChange(this, pagination);
    }

    buildOperation = (record) => {
        TableUtils.buildOperation(this, record);
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
        TableUtils.handleDelete(this, record);
    } 

    expandedRowRender = (record) => {
        const {currentTreeNode, treeList} = this.props;
        const nextTreeNode = TableUtils.getNextTreeNode(this, currentTreeNode);
        return <EntitySubTreeTable treeList={treeList} currentTreeNode={nextTreeNode} parentObject={record}/>
    };
    
    handleCancel = (e) => {
        TableUtils.closeDialog(this);
    }

    refreshDelete = (records) => {
        TableUtils.refreshDelete(this, records);
    }
    
    refresh = (responseData) => {
        TableUtils.refreshEdit(this, responseData);
    }

    createForm = () => {
        return  <EntityDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    render() {
        const {data, columns, scrollX, loading} = this.state;
        const {currentTreeNode} = this.props;
        const nextTreeNode = TableUtils.getNextTreeNode(this, currentTreeNode)
        return (
          <div >
            <div>
                <div className="table-button-group">
                    {this.createButtonGroup()}
                </div>
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
