
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotOQcTable from "@components/mms/table/MaterialLotOQcTable";
import EntityProperties from "../framework/EntityProperties";
import MaterialLotOQcProperties from "./MaterialLotOQcProperties";


export default class MaterialLotOQcManagerProperties extends EntityProperties{

    static displayName = "MaterialLotOQcManagerProperties";

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    afterQuery = (responseBody, whereClause) => {
        this.orderTable.setState({
            data: responseBody.dataList,
            whereClause: whereClause,
          })
    }

    getTableData = () => {
        const self = this;
        let requestObject = {
          tableRrn: self.state.tableRrn,
          success: function(responseBody) {
            self.setState({
              tableData: responseBody.dataList,
              table: responseBody.table,
              loading: false
            }); 
            self.form.handleSearch();
            self.form.resetFormFileds();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <MaterialLotOQcTable
                    tableRrn = {this.state.tableRrn}
                    scrollY={200}
                    pagination={true}
                    ref ={(orderTable)=>{this.orderTable = orderTable}} 
                    materialLotQc = {this.materialLotQc}                    
                />
    }

    buildOtherComponent = () => {
        return <MaterialLotOQcProperties
                    tableRrn = {this.state.parameters.parameter2}
                    materialLotQcDialogTableName = {this.state.parameters.parameter1}
                    ref={(materialLotQc) => { this.materialLotQc = materialLotQc }} 
                    onSearch={this.getTableData.bind(this)} 
                />
    }
}