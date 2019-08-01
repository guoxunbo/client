import EntityListTable from './EntityListTable';
import QuestionForm from '../Form/QuestionForm';
import { Form, Button, Table } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import QuestionRequest from '../../api/question-manager/QuestionRequest';
import EntityManagerRequest from '../../api/entity-manager/EntityManagerRequest';
import { Application } from '../../api/Application';
import { DefaultRowKey } from '../../api/const/ConstDefine';
import TableManagerRequest from '../../api/table-manager/TableManagerRequest';
import QuestionLineRequest from '../../api/question-line-manager/QuestionLineRequest';
import Field from '../../api/dto/ui/Field';
import './QuestionTable.scss';

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
            console.log(record);
            console.log(record["status"]);
            if(record["status"] == "Doing") {
                return "doing-row";
            }
            return ''; 
        }
        
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createCloseButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createCloseButton = () => {
        return <Button key="close" type="primary" style={styles.tableButton} icon="close-circle" onClick={() => this.handleClose()}>{I18NUtils.getClientMessage(i18NCode.BtnClose)}</Button>;
    }

    componentWillMount = () => {
        this.setState({
            rowClassName: (record, index) => this.getRowClassName(record, index),
        });
        this.buildSubTabelColumns();
    }

    handleDelete = (record) => {
        const self = this;
        let object = {
            modelClass : self.state.table.modelClass,
            values: record,
            deleteRelationEntityFlag: true,
            success: function(responseBody) {
                self.refreshDelete(record);
            }
        };
        EntityManagerRequest.sendDeleteRequest(object);
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
        const WrappedAdvancedEntityForm = Form.create()(QuestionForm);
        return  <WrappedAdvancedEntityForm ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
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
        return <Table columns={this.state.childColumns} dataSource={this.state.children[record.objectRrn]} pagination={false} />;
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

    buildChildColumn = (fields) => {
        let columns = [];
        let scrollX = 0;
        for (let field of fields) {
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
                let columnData = self.buildChildColumn(table.fields);
                self.setState({
                    childColumns: columnData.columns
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(object);
    }

    render() {
        const {data, columns, rowClassName, selectedRowKeys, scrollX} = this.state;
        const rowSelection = this.getRowSelection(selectedRowKeys);
        return (
          <div >
            <div style={styles.buttonGroup}>
                {this.createButtonGroup()}
            </div>
            <div style={styles.tableContainer}>
                <Table
                    ref= {el => this.table = el}
                    dataSource={data}
                    className="custom-table"
                    pagination={this.props.pagination || Application.table.pagination}
                    columns = {columns}
                    scroll = {{ x: scrollX }}
                    rowKey = {this.props.rowkey || DefaultRowKey}
                    loading = {this.props.loading}
                    rowClassName = {rowClassName.bind(this)}
                    rowSelection = {rowSelection}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
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


const styles = {
    tableButton: {
        marginLeft:'20px'
    },
    buttonGroup:{
        marginBottom:'10px',
        marginRight:'30px',
        textAlign:'right'
    }
};
