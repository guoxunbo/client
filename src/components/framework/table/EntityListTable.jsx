import  React, { Component } from 'react';

import { Table, Popconfirm, Button,Form, Dropdown, Menu, Icon } from 'antd';
import './ListTable.scss';
import {Application, SessionContext} from '@api/Application'
import {DefaultRowKey, Language} from '@api/const/ConstDefine'
import MessageUtils from '@api/utils/MessageUtils';
import Field from '@api/dto/ui/Field';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import * as PropTypes from 'prop-types';
import TableObject from '@api/dto/ui/Table';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import { Upload } from 'antd';
import NoticeUtils from '@utils/NoticeUtils';

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
        };
    }

    initTable = () => {
        const self = this;
        let requestObject = {
            tableRrn: this.props.tableRrn,
            initFlag: true,
            success: function(responseBody) {
                let table = responseBody.table;
                let columnData = self.buildColumn(table);
                let data = responseBody.dataList;
                if (self.props.scanAddFlag) {
                    data = [];
                }
                self.setState({
                    data: data,
                    table: table,
                    loading: false,
                    columns: columnData.columns,
                    scrollX: columnData.scrollX,
                    pagination: self.props.pagination != undefined ? self.props.pagination : Application.table.pagination
                }); 
            }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    componentDidMount = () => {
        this.initTable();
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
        let maxWidth = document.querySelector('#' + EntityTableId).clientWidth;
        let self = this;
        let oprationColumn = {
            key: "opration",
            title: I18NUtils.getClientMessage(i18NCode.Operation),
            dataIndex: "opration",
            align: "center",
            fixed: maxWidth > scrollX + Application.table.oprationColumn.width ? false : 'right',
            width: Application.table.oprationColumn.width,
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
        let operations = [];
        operations.push(this.buildEditButton(record));
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

    buildEditButton = (record) => {
        return <Button key="edit" style={{marginRight:'1px'}} icon="edit" onClick={() => this.handleEdit(record)} size="small" href="javascript:;"></Button>;
    }

    buildDeletePopConfirm = (record) => {
        return <Popconfirm key="delete" title={I18NUtils.getClientMessage(i18NCode.ConfirmDelete)} onConfirm={() => this.handleDelete(record)}>
                    <Button icon="delete" size="small" type="danger"></Button>
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
            if (dataIndex > -1 ) {
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

    handleEdit = (record) => {
        this.setState({
            formVisible : true,
            editorObject: record
        })
    }

    handleAdd = () => {
        this.setState({
            formVisible : true,
            editorObject: TableObject.buildDefaultModel(this.state.table.fields)
        })
    }

    /**
     * 更新表格数据
     * @param responseData 数据如用户、
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

    handleCancel = (e) => {
        this.setState({
            formVisible: false
        })
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
        return <Button key="add" type="primary" className="table-button" icon="plus" onClick={() => this.handleAdd()}>{I18NUtils.getClientMessage(i18NCode.BtnAdd)}</Button>;
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
        return <Button key="exportData" type="primary" className="table-button" icon="file-excel" onClick={this.exportData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnExp)}
                    </Button>
    }

    /**
     * 创建导入按钮 只能支持xls,xlsx导入
     */
    createImportButton = () => {
        return (<Upload key="import" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" className="table-button" icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnImp)}</Button>
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
    }

    /**
     * 默认的table框的选择框属性 此处不实现。
     */
    getRowSelection = (selectedRowKeys) => {

    }

    onChange = (pagination) => {
        var keys = Object.keys(pagination);
        if (keys.length === 0) {
            pagination = false;
        }
        this.setState({
            pagination: pagination
        });
    }

    render() {
        const {data, columns, rowClassName, selectedRowKeys, scrollX, pagination, loading} = this.state;
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
                    scroll = {{ x: scrollX, y:this.props.scrollY}}
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

                >
                </Table>
            </div>
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
}
