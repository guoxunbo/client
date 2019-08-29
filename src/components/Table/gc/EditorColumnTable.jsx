import { Table, Input, Button, Popconfirm, Form } from 'antd';

import './EditorColumnTable.scss';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import Field from '../../../api/dto/ui/Field';
import StockOutCheckRequest from '../../../api/gc/stock-out-check/StockOutCheckRequest';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, record, field } = this.props;
    const { editing } = this.state;
    return editing ? 
    (
      field.buildTableFormItem(record, form, this.save, this.save)
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditorColumnTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table:{},
      tableData:[],
      columns:[], 
      scrollX: undefined,
      dataSource: [],
    };
  }

  buildTable = () => {
    const self = this;
    let requestObject = {
      tableName : this.props.refTableName,
      success: function(tableResponseBody, dataResponseBody) {
        let table = tableResponseBody.table;
        let columnData = self.buildColumn(table);
        self.setState({
          table: table,
          columns: columnData.columns,
          scrollX: columnData.scrollX,
          dataSource: dataResponseBody.stockOutCheckList
        });
      }
    };

    StockOutCheckRequest.sendGetTableAndGetCheckDataRequest(requestObject);
  }

  buildColumn = (table) => {
    let fields = table.fields;
    let columns = [];
    let scrollX = 0;
    for (let field of fields) {
        field.table = table;
        table.refresh = this.refresh;
        let f  = new Field(field, this.props.form);
        let column = f.buildColumn();
        if (column != null) {
          if (f.editable) {
            column.editable = true;     
          }
          column.field = f;
          columns.push(column);
          scrollX += column.width;
        }
    }
    return {
        columns: columns,
        scrollX: scrollX
    };
  }

  componentDidMount = () => {
    this.buildTable();
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          field: col.field,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditorColumnTable;