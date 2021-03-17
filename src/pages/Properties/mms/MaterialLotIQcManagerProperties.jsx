
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotIQcManagerTable from "@components/mms/table/MaterialLotIQcManagerTable";
import EntityProperties from "@properties/framework/EntityProperties";
import MaterialLotQcProperties from "./MaterialLotQcProperties";

export default class MaterialLotIQcManagerProperties extends EntityProperties{

    static displayName = "MaterialLotIQcManagerProperties";

    constructor(props) {
        super(props);  
        this.state= {...this.state, showQueryFormButton: true}
    }

    afterQuery = (responseBody, whereClause) => {
        this.orderTable.setState({
            data: responseBody.dataList,
            whereClause: whereClause,
          })
    }

    getTableData = () => {
        const self = this;
        self.form.resetFormFileds();
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
              tableData: responseBody.dataList,
              table: responseBody.table,
              loading: false
            }); 
            self.form.handleSearch();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <MaterialLotIQcManagerTable
                    tableRrn = {this.state.tableRrn}
                    scrollY={200}
                    pagination={true}
                    ref ={(orderTable)=>{this.orderTable = orderTable}} 
                    materialLotQc = {this.materialLotQc}                    
                />
    }

    buildOtherComponent = () => {
        return <MaterialLotQcProperties
                    tableRrn = {this.state.parameters.parameter2}
                    materialLotQcDialogTableName = {this.state.parameters.parameter1}
                    ref={(materialLotQc) => { this.materialLotQc = materialLotQc }} 
                    onSearch={this.getTableData.bind(this)} 
                />
    }
}