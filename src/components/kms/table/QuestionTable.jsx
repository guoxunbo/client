import EntityListTable from '@components/framework/table/EntityListTable';
import QuestionDialog from '@components/kms/dialog/QuestionDialog';
import { Button, Table } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import QuestionRequest from '@api/question-manager/QuestionRequest';
import { Application } from '@api/Application';
import { DefaultRowKey } from '@const/ConstDefine';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import QuestionLineRequest from '@api/question-line-manager/QuestionLineRequest';
import Field from '@api/dto/ui/Field';
import styles from './QuestionTable.module.scss';

export default class QuestionTable extends EntityListTable {

    static displayName = 'QuestionTable';

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            childColumns: [],
            children:{}
        };
    }

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'selected-row';
        } else {
            if(record["status"] == "Doing") {
                return styles.doingRow;
            }
            if(record["status"] == "Watching") {
                return styles.watchingRow;
            }
            return ''; 
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createWatchButton());
        buttons.push(this.createCloseButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createWatchButton = () => {
        return <Button key="watch" type="primary" className="table-button" icon="highlight" onClick={() => this.handleWatch()}>{I18NUtils.getClientMessage(i18NCode.BtnWatch)}</Button>;
    }

    createCloseButton = () => {
        return <Button key="close" type="primary" className="table-button" icon="close-circle" onClick={() => this.handleClose()}>{I18NUtils.getClientMessage(i18NCode.BtnClose)}</Button>;
    }

    componentWillMount = () => {
        this.setState({
            rowClassName: (record, index) => this.getRowClassName(record, index),
        });
        this.buildSubTabelColumns();
    }

    handleWatch = () => {
        let self = this;
        let selectedRow = this.getSingleSelectedRow();
        if (selectedRow) {
            let object = {
                question: selectedRow,
                success: function(responseBody) {
                    self.refresh(responseBody.question)
                }
            }
            QuestionRequest.sendWatchRquest(object);
        }
    }

    handleClose = () => {
        let self = this;
        let selectedRow = this.getSingleSelectedRow();
        if (selectedRow) {
            let object = {
                question: selectedRow,
                success: function(responseBody) {
                    self.refresh(responseBody.question)
                }
            }
            QuestionRequest.sendCloseRquest(object);
        }
    }

    createForm = () => {
        return  <QuestionDialog object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    /**
     * 当有子表格的时候无法使用fixed属性
     * 会和子表格样式冲突
     */
    buildOperationColumn() {
        let self = this;
        let oprationColumn = {
            key: "opration",
            title: I18NUtils.getClientMessage(i18NCode.Operation),
            dataIndex: "opration",
            align: "center",
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

    expandedRowRender = (record) => {
        return <Table rowKey = {this.props.rowkey || DefaultRowKey} columns={this.state.childColumns} dataSource={this.state.children[record.objectRrn]} pagination={false} />;
    };
    
    onExpand = (expand, record) => {
        let self = this;
        // 如果是展开 则去查询数据 如果不是展开，则销毁数据
        if (expand) {
            let object = {
                questionRrn: record.objectRrn,
                success: function(responseBody) {
                    self.setState({
                        children: {
                            ...self.state.children,
                            [record.objectRrn]: responseBody.questionLines
                        }
                    });
                }
            }
            QuestionLineRequest.sendGetByQuestionRrn(object);
        } else {
            self.setState({
                children: {
                    ...self.state.children,
                    [record.objectRrn]: []
                }
            });
        }
    }

    buildChildColumn = (table) => {
        let fields = table.fields;
        let columns = [];
        let scrollX = 0;
        for (let field of fields) {
            // 传递table，记录每个filed对应真实的table数据。而不是只有一个tableRrn.省去后面查询
            field.table = table;
            let f  = new Field(field);
            let column = f.buildColumn();
            if (column != null) {
                columns.push(column);
                scrollX += column.width;
            }
        }
        return {
            columns: columns,
            scrollX: scrollX
        };
    }

    buildSubTabelColumns() {
        let self = this;
        const object = {
            name: "KMSQuestionLine",
            success: function(responseBody) {
                let table = responseBody.table;
                let columnData = self.buildChildColumn(table);
                self.setState({
                    childColumns: columnData.columns
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(object);
    }

    render() {
        const {data, columns, rowClassName, selectedRowKeys, scrollX, pagepagination} = this.state;
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
                    id="entity-table"
                    pagination={pagepagination}
                    columns = {columns}
                    scroll = {{ x: scrollX, y: 500 }}
                    rowKey = {this.props.rowkey || DefaultRowKey}
                    loading = {this.state.loading}
                    rowClassName = {rowClassName.bind(this)}
                    rowSelection = {rowSelection}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                    onChange= {this.onChange.bind(this)}
                    expandedRowRender={this.expandedRowRender.bind(this)}
                    onExpand={this.onExpand}
                >
                </Table>
            </div>
            {this.createForm()}
          </div>
        );
    }
}

