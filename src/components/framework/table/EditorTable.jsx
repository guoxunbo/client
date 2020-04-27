import { Table, Popconfirm, Button, Form } from 'antd';
import * as PropTypes from 'prop-types';
import {DefaultRowKey, DateFormatType, SqlType} from '@const/ConstDefine'
import {Application} from '@api/Application';
import TableObject from '@api/dto/ui/Table';
import PropertyUtils from '@api/utils/PropertyUtils';
import uuid from 'react-native-uuid';
import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest'; 
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import moment from 'moment';
import './ListTable.scss';
import TableUtils from '../utils/TableUtils';
import NoticeUtils from '@utils/NoticeUtils';

const EditableContext = React.createContext();
const TableId = "tab-table";

class EditableCell extends React.Component {
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      field,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          let formItem =null;
          if (editing) {
            formItem = field.buildTableFormItem(record, form);
          }
          return (
            <td {...restProps}>
              {editing ? formItem : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table:{},
      data:[],
      editingKey: '', 
      columns:[], 
      scrollX: undefined,
      rowClassName: (record, index) => {},
      parentReadOnly: false
    };
  }

  componentWillReceiveProps = (props) => {
    const self = this;
    const {whereClause, parentObject} = props;
    if (!parentObject) {
      self.setState({
        data: [],
      });
      return;
    }
    if (whereClause === SqlType.NoResultCondition) {
      return;
    }
    if (whereClause === this.props.whereClause) {
      return;
    }
    
    let requestObject = {
      tableName: this.props.refTableName,
      whereClause: whereClause,
      success: function(responseBody) {
        self.setState({
          data: responseBody.dataList,
          parentReadOnly: parentObject && parentObject["readonly"]
        });
      }
    }
    TableManagerRequest.sendGetDataByNameRequest(requestObject);
  }
  
  componentDidMount = () => {
    TableUtils.initTable(this, this.props.whereClause, this.props.refTableName);
  }

  refresh = (responseData) => {
    var self = this;
    let datas = self.state.data;
    let dataIndex = -1;
    datas.map((data, index) => {
        if (data.objectRrn == responseData.objectRrn) {
            dataIndex = index;
        }
    });
    if (dataIndex > -1) {
        datas.splice(dataIndex, 1, responseData);
    } else {
        // 新增的就放在第一位
        datas.unshift(responseData);
    }
    self.setState({
        data: datas,
        editingKey: "",
    }) 
    NoticeUtils.showSuccess();
  }

  /**
   * 创建操作列
   */
  buildOperationColumn = (scrollX) => {
    let maxWidth = document.querySelector('#' + TableId).clientWidth;
    let operationColumn = {
      operation: true,
      title: I18NUtils.getClientMessage(i18NCode.Operation),
      dataIndex: 'operation',
      align: "center",
      fixed: maxWidth > scrollX + Application.table.oprationColumn.width ? false : 'right',
      width: Application.table.oprationColumn.width,
      render: (text, record) => {
        return (
          <div>
            {this.isEditing(record) ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <Button style={{marginRight:8}} icon="save" onClick={() => this.save(form, record)} size="small" href="javascript:;"/>
                  )}
                </EditableContext.Consumer>
                <Popconfirm title={I18NUtils.getClientMessage(i18NCode.ConfirmCancel)} onConfirm={() => this.cancel(record.objectRrn)}>
                  <Button style={{marginRight:8}} icon="close-circle" size="small" href="javascript:;"/>
                </Popconfirm>
              </span>
            ) : (
              <div>
                <Button disabled={this.state.parentReadOnly} style={{marginRight:'1px'}} size="small" icon="edit" onClick={() => this.edit(record)} href="javascript:;"/>
                  <Popconfirm disabled={this.state.parentReadOnly} title={I18NUtils.getClientMessage(i18NCode.ConfirmDelete)} onConfirm={() => this.handleDelete(record)}>
                    <Button disabled={this.state.parentReadOnly} icon="delete" size="small" type="danger"/>
                  </Popconfirm>
              </div>    
            )}
          </div>
        );
      }
    }
    return operationColumn;
  }

  isEditing = (record) => {
    return record.objectRrn === this.state.editingKey;
  };

  edit(record) {
    this.setState({ editingKey: record.objectRrn });
  }

  /**
   * 保存一行数据
   * @param form 表单
   * @param rowData 当前行数据
   */
  save(form, rowData) {
    form.validateFields((error, record) => {
      if (error) {
        return;
      }
      PropertyUtils.copyProperties(record, rowData);
      for (let property in rowData) {
        if (rowData[property] && moment.isMoment(rowData[property])) {
            // 如果是单独的时间类型，不是个区域时间(dateFromTo)的话
            rowData[property] = rowData[property].format(DateFormatType.DateTime)
        }
      }
      let self = this;
      const { data, table } = this.state;
      let object = {
        modelClass : table.modelClass,
        values: rowData,
        tableRrn: table.objectRrn,
        success: function(responseBody) {
          let responseData = responseBody.data;
          let dataIndex = -1;
          if (rowData.objectRrn) {
            data.map((d, index) => {
              if (d.objectRrn == responseData.objectRrn) {
                  dataIndex = index;
              }
            });
          } else {
            data.map((d, index) => {
              if (!d.objectRrn) {
                  dataIndex = index;
              }
            });
          }
          data.splice(dataIndex, 1, responseData);
          self.setState({
            data: data,
            editingKey: ""
          }); 
          NoticeUtils.showSuccess();
        }
      }
      EntityManagerRequest.sendMergeRequest(object);
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  getRowClassName = (record, index) => {
    if(index % 2 ===0) {
        return 'even-row'; 
    } else {
        return ''; 
    }
  };

  handleAdd = () => {
    const { data, table } = this.state;
    // 新建的时候如果有栏位是来源于父值的话，对其进行赋值
    const newData = TableObject.buildDefaultModel(table.fields, this.props.parentObject);
    newData[DefaultRowKey] = uuid.v1();
    newData["newFlag"] = true;

    this.setState({
      data: [...data, newData],
      editingKey: newData.objectRrn,
    });
  }

  refreshDelete = (records) => {
    TableUtils.refreshDelete(this, records);
  }

  handleDelete = (record) => {
    TableUtils.handleDelete(this, record);
  }

  createButtonGroup = () => {
    let buttons = [];
    buttons.push(<Button key="add" disabled={this.state.parentReadOnly} style={{marginRight:'1px', marginLeft:'10px'}} size="small" icon="plus" onClick={() => this.handleAdd()}  href="javascript:;">{I18NUtils.getClientMessage(i18NCode.BtnAdd)}</Button>);
    return buttons;
  }

  render() {
    const {data, scrollX, rowClassName} = this.state;

    const components = {
      body: {
        cell: EditableCell
      },
    };

    const columns = this.state.columns.map((col) => {
      if (col.operation) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          field: col.field
        }),
      };
    });
    return (
      <div>
          {(this.props.editFlag && this.props.parentObject) ? <div className="table-button-group"> {this.createButtonGroup()}</div> : ''}
            <EditableContext.Provider value={this.props.form}>
              <Table
                rowKey={DefaultRowKey}
                components={components}
                bordered
                pagination={Application.table.pagination}
                dataSource={data}
                columns={columns}
                scroll = {{ x: scrollX, y: 350 }}
                rowClassName={rowClassName.bind(this)}
                id={TableId}
              />
          </EditableContext.Provider>
      </div>
    );
  }
}
export default Form.create()(EditableTable);
export {EditableTable};

EditableTable.prototypes = {
    refTableName: PropTypes.string,
    editFlag: PropTypes.bool,
    whereClause: PropTypes.string,
    newFlag: PropTypes.bool,
    parentObject: PropTypes.object,
}
