import  React, { Component } from 'react';

import { Table, Popconfirm, Button, Dropdown, Menu, Icon, Tabs, Divider } from 'antd';
import './ListTable.scss';
import {Application, SessionContext} from '@api/Application'
import {DefaultRowKey, Language} from '@api/const/ConstDefine'
import EntityDialog from '@components/framework/dialog/EntityDialog';
import * as PropTypes from 'prop-types';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import { Upload } from 'antd';
import NoticeUtils from '@utils/NoticeUtils';
import EventUtils from '@api/utils/EventUtils';
import AuthorityButton from '@components/framework/button/AuthorityButton';
import Tab, { TabType } from '@api/dto/ui/Tab';
import EntitySubTreeTable from './EntitySubTreeTable';
import TableUtils from '../utils/TableUtils';

const ExpMenuKey = {
    exportTemplate: "exportTemplate",
    exportData: "exportData"
}
const EntityTableId = "entity-table";
/**
 * 基本表格。具备新建和导出数据
 * 每一行都带有编辑和删除的列 
 */
export default class EntityListTable extends Component {

    static displayName = 'EntityListTable';

    constructor(props) {
        super(props);
        this.state = TableUtils.getDefaultTableState(this);
    }

    componentDidMount = () => {
        TableUtils.initTable(this, undefined);
    }

    componentWillReceiveProps = (props) => {
        let {selectedRowKeys, selectedRows} = this.state;
        let stateSeletcedRowKeys = selectedRowKeys.merge(props.selectedRowKeys);
        let stateSelectedRows = selectedRows.merge(props.selectedRows, this.props.rowKey);
        if (props.resetFlag) {
            stateSeletcedRowKeys = [];
            stateSelectedRows = [];
        }
        this.setState({
            loading: props.loading,
            selectedRowKeys: stateSeletcedRowKeys || [],
            selectedRows: stateSelectedRows || [],
            data: props.data
        })
    }

    componentWillMount = () => {
        this.setState({
            rowClassName: (record, index) => this.getRowClassName(record, index),
        });
    }
    
    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'selected-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    buildOperationColumn(scrollX) {
        const {rootTreeNode} = this.props;
        const nextTreeNode = TableUtils.getNextTreeNode(this, rootTreeNode);
        let maxWidth = document.querySelector('#' + EntityTableId).clientWidth;
        let fixed = false;
        if (!nextTreeNode) {
            fixed = maxWidth > scrollX + Application.table.oprationColumn.width ? false : 'right';
        }
        let self = this;
        let oprationColumn = {
            key: "opration",
            title: I18NUtils.getClientMessage(i18NCode.Operation),
            dataIndex: "opration",
            align: "center",
            fixed: fixed,
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

    buildOperation = (record) => {
        return TableUtils.buildOperation(this, record);
    }

    hasEditBtnAuthority = (record) => {
        return true;
    }

    buildEditButton = (record) => {
        let hasEditBtnAuthority = this.hasEditBtnAuthority(record)
        return <Button key="edit" style={{marginRight:'1px'}} icon="edit" size="small" 
                        onClick={() => this.handleEdit(record)} 
                        disabled={!hasEditBtnAuthority} href="javascript:;"/>
    }

    hasDeleteBtnAuthority = (record) => {
        return true;
    }

    buildDeletePopConfirm = (record) => {
        let hasDeleteBtnAuthority = this.hasDeleteBtnAuthority(record)
        return <Popconfirm key="delete" disabled={!hasDeleteBtnAuthority} title={I18NUtils.getClientMessage(i18NCode.ConfirmDelete)} onConfirm={() => this.handleDelete(record)}>
                    <Button disabled={!hasDeleteBtnAuthority} icon="delete" size="small" type="danger"/>
                </Popconfirm>;
    }
    
    handleDelete = (record) => {
        TableUtils.handleDelete(this, record);
    } 

    refreshDelete = (records) => {
        TableUtils.refreshDelete(this, records);
    }

    handleEdit = (record) => {
        TableUtils.openDialog(this, record);
    }

    handleAdd = () => {
        TableUtils.openDialog(this, undefined, true);
    }

    refresh = (responseData) => {
        TableUtils.refreshEdit(this, responseData);
    }

    handleCancel = (e) => {
        TableUtils.closeDialog(this);
    }

    formRef = (form) => {
        this.form = form;
    };

    handleExpMenuClick({ key }) {
        if (ExpMenuKey.exportTemplate === key) {
            this.exportTemplate();
        } else if (ExpMenuKey.exportData === key) {
            this.exportData();
        }
    }

    getSelectedRows = () => {
        const {selectedRows} = this.state;
        if (!selectedRows || selectedRows.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
        }
        return selectedRows;
    }

    getSingleSelectedRow = () => {
        const {selectedRows} = this.state;
        if (selectedRows) {
            if (selectedRows.length != 1) {
                NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            } 
        }
        return selectedRows[0];
    }

    /**
     * 导出模板
     */
    exportTemplate = () => {
        const {table} = this.state;
        let language = SessionContext.getLanguage();

        let fileName = table.name;
        if (language == undefined) {
            language = Language.Chinese;
        }
        if (language == Language.Chinese) {
            fileName = table.labelZh;
        } else if (language == Language.English) {
            fileName = table.label;
        }
        let object = {
            tableRrn: table.objectRrn,
            fileName: fileName + ".xls",
        }
        TableManagerRequest.sendExportRequest(object, true);
    }

    /**
     * 导出数据
     */
    exportData = () => {
        const {table} = this.state;
        const {whereClause} = this.props;

        let language = SessionContext.getLanguage();

        let fileName = table.name;
        if (language == undefined) {
            language = Language.Chinese;
        }
        if (language == Language.Chinese) {
            fileName = table.labelZh;
        } else if (language == Language.English) {
            fileName = table.label;
        }
        let object = {
            tableRrn: table.objectRrn,
            whereClause: whereClause,
            fileName: fileName + ".xls",
        }
        TableManagerRequest.sendExportRequest(object);
    }

    handleUpload = (option) => {
        const {table} = this.state;
        let object = {
            tableRrn: table.objectRrn,
        }
        TableManagerRequest.sendImportRequest(object, option.file);
    }

    createAddButton = () => {
        return <AuthorityButton i18NCode={i18NCode.BtnAdd} key="add" type="primary" className="table-button" icon="plus" onClick={() => this.handleAdd()}/>
    }

    /**
     * 创建导出数据以及导出模板的按钮
     * 一般具备导入功能才会具备导出模板
     */
    createExportDataAndTemplateButton = () => {
        const exportMenu = (
            <Menu onClick={this.handleExpMenuClick.bind(this)}>
                <Menu.Item key={ExpMenuKey.exportData}>
                    <Icon type="database" /> {I18NUtils.getClientMessage(i18NCode.BtnExpData)}
                </Menu.Item>
                <Menu.Item key={ExpMenuKey.exportTemplate}>
                    <Icon type="file-excel" />{I18NUtils.getClientMessage(i18NCode.BtnExpTemplate)}
                </Menu.Item>
            </Menu>
        );
        return <Dropdown key="export" overlay={exportMenu}>
                    <Button type="primary" className="table-button" icon="export" >
                        {I18NUtils.getClientMessage(i18NCode.BtnExp)} <Icon type="down" />
                    </Button>
                </Dropdown>;
    }

    /**
     * 创建导出数据功能。基本功能具备
     */
    createExportDataButton = () => {
        return <AuthorityButton i18NCode={i18NCode.BtnExp} key="exportData" type="primary" className="table-button" icon="file-excel" onClick={this.exportData}/>
    }

    /**
     * 创建导入按钮 只能支持xls,xlsx导入
     */
    createImportButton = () => {
        return (<Upload key="import" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <AuthorityButton type="primary" className="table-button" icon="file-add" i18NCode={i18NCode.BtnImp}/>
                </Upload>);
    }

    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

    createForm = () => {
        return  <EntityDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }
    
    /**
     * 行点击事件
     */
    selectRow = (record) => {
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        // 发送事件变化
        EventUtils.getEventEmitter().emit(EventUtils.getEventNames().ParentTableRowSelected, this, record, this.props.rowKey);
    }

    /**
     * 默认的table框的选择框属性 此处不实现。
     */
    getRowSelection = (selectedRowKeys) => {
        
    }

    onChange = (pagination) => {
        TableUtils.onChange(this, pagination);
    }

    /**
     * 选中的数据，根据业务决定其是否能操作tableTab以及树形结构的数据的数据
     * @param selectedObject 选中的数据
     * 
     */
    isObjectReadOnly = (selectedObject) => {
        selectedObject["readonly"] = false;
        return selectedObject;
    }

    /**
     * 如果tab类型是table的话直接在这里显示
     */
    createTableTab = () => {
        const {table} = this.state;
        const tabs = table.tabs;
        const tabPanels = [];
        const {selectedRows} = this.state;
        let selectedObject = undefined;
        if (selectedRows && selectedRows.length > 0) {
            selectedObject = this.isObjectReadOnly(selectedRows[0]);
        }
        
        if (tabs && tabs.length > 0) {
            let tableTabs = tabs.filter((tab) => TabType.Table === tab.tabType);
            if (tableTabs && tableTabs.length > 0) {
                tableTabs.forEach((tableTab) => {
                    let tabPanel = new Tab(tableTab);
                    tabPanels.push(this.buildTab(tabPanel, selectedObject));
                });
            }
        }
        return (<Tabs>
            {tabPanels}
         </Tabs>)
    }

    /**
     * 创建tab。抽象此方法方便后续有页面构建复杂类型的tab
     * @param tab 使用new Tab()之后传递的信息
     * @param selectedObject 选择的具体对象
     * @returns <TabPanel>
     */
    buildTab = (tab, selectedObject) => {
        return tab.buildTableTab(selectedObject);
    }

    expandedRowRender = (record) => {
        const {rootTreeNode} = this.props;
        const nextTreeNode = TableUtils.getNextTreeNode(this, rootTreeNode);

        record = this.isObjectReadOnly(record);
        return this.createEntitySubTreeTable(record, nextTreeNode);
    };
    
    createEntitySubTreeTable = (record, currentTreeNode) => {
        const {treeList} = this.props;
        return <EntitySubTreeTable currentTreeNode={currentTreeNode} treeList={treeList} parentObject={record}/>
    }

    render() {
        const {data, columns, rowClassName, selectedRowKeys, scrollX, pagination, loading} = this.state;
        const {rootTreeNode} = this.props;
        const nextTreeNode = TableUtils.getNextTreeNode(this, rootTreeNode)

        const rowSelection = this.getRowSelection(selectedRowKeys);
        return (
          <div >
            <div className="table-button-group">
                {this.createButtonGroup()}
            </div>
            <div>
                <Table  
                    ref= {el => this.table = el}
                    dataSource={data}
                    bordered
                    id={EntityTableId}
                    pagination={pagination}
                    columns = {columns}
                    scroll = {{ x: scrollX, y: this.props.scrollY}}
                    rowKey = {this.props.rowKey || DefaultRowKey}
                    loading = {loading}
                    rowClassName = {rowClassName.bind(this)}
                    rowSelection = {rowSelection}
                    onChange= {this.onChange.bind(this)}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                    expandedRowRender={nextTreeNode ? this.expandedRowRender.bind(this) : undefined}
                />
            </div>
            <Divider />
            {this.createTableTab()}
            {this.createForm()}
          </div>
        );
    }
}

EntityListTable.prototypes = {
    tableRrn: PropTypes.number.isRequired,
    data: PropTypes.array,
    rowClassName: PropTypes.func,
    rowkey: PropTypes.string,
    pagination: PropTypes.pagination,
    selectedRowKeys: PropTypes.array,
    selectedRows: PropTypes.array,
    resetFlag: PropTypes.bool,
    resetData: PropTypes.func,
    treeList: PropTypes.array,
    currentTreeNode: PropTypes.object
}
