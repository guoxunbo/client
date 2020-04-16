import EntityListTable from "@components/framework/table/EntityListTable";
import { Button } from "antd";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import TableObject from '@api/dto/ui/Table';
import IconUtils from "@api/utils/IconUtils";
import EntityDialog from "@components/framework/dialog/EntityDialog";
import { SqlType } from "@const/ConstDefine";
import TableUtils from "@components/framework/utils/TableUtils";

const DataType = {
    FixedString: "F",
    Date: "D",
    Variable: "V",
    Sequence: "S"

}
const TableName = {
    FixedString: "COMFixedStringLine",
    DateLine: "COMDateLine",
    VariableLine: "COMVariableLine",
    SequenceLine: "COMSequenceLine",
}
export default class GeneratorRuleLineTable extends EntityListTable {

    static displayName = 'GeneratorRuleLineTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }
      
    componentWillReceiveProps = (props) => {
        const {whereClause} = props;
        if (whereClause === SqlType.NoResultCondition) {
            return;
        }
        if (whereClause === this.props.whereClause) {
            return;
        }
        const self = this;
        let requestObject = {
            tableName: this.props.refTableName,
            whereClause: whereClause,
            success: function(responseBody) {
                self.setState({
                    data: responseBody.dataList,
                });
            }
        }
        TableManagerRequest.sendGetDataByNameRequest(requestObject);
    }
    
    componentDidMount = () => {
        TableUtils.initTable(this, SqlType.NoResultCondition, this.props.refTableName);
    }
    
    /**
     * 此处因为点击不同的Button要展现不同的form信息。故此处的table用formTable去代替
     */
    createForm = () => {
        return  <EntityDialog ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.formTable} tableData={this.state.data} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    handleEdit = (record) => {
        this.handleButtonClick(record.dataType, record);
    }

    /**
     * TODO 后续需要优化。尽量把table的信息放到state中，如果存在就直接取，不需要去再发起请求
     */
    handleButtonClick = (dataType, record) => {
        let self = this;
        let tableName = "";
        if (DataType.FixedString === dataType) {
            tableName = TableName.FixedString
        } else if (DataType.Date === dataType) {
            tableName = TableName.DateLine
        } else if (DataType.Variable === dataType) {
            tableName = TableName.VariableLine
        } else if (DataType.Sequence === dataType) {
            tableName = TableName.SequenceLine
        }
        let requestObject = {
            name: tableName,
            success: function(responseBody) {
                let table = responseBody.table;
                let editorObject = record ? record : TableObject.buildDefaultModel(table.fields, self.props.parentObject);
                self.setState({
                    formTable: responseBody.table,
                    editorObject: editorObject,
                    formVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    createButtonGroup = () => {
        if (!this.props.parentObject) {
            return;
        }
        return (<div>
                    <Button style={{marginRight:'1px', marginLeft:'10px'}} size="small" href="javascript:;" 
                        onClick={() => this.handleButtonClick(DataType.FixedString)}>
                        {IconUtils.buildIcon("icon-guding")}F</Button>
                    <Button style={{marginRight:'1px', marginLeft:'10px'}} size="small" href="javascript:;"
                        onClick={() => this.handleButtonClick(DataType.Date)}>
                        {IconUtils.buildIcon("icon-riqi")}D</Button>
                    <Button style={{marginRight:'1px', marginLeft:'10px'}} size="small" href="javascript:;"
                        onClick={() => this.handleButtonClick(DataType.Variable)}>
                        {IconUtils.buildIcon("icon-canshu")}V</Button>
                    <Button style={{marginRight:'1px', marginLeft:'10px'}} size="small" href="javascript:;"
                        onClick={() => this.handleButtonClick(DataType.Sequence)}>
                        {IconUtils.buildIcon("icon-xulie")}S</Button>
                </div>);
    }

}