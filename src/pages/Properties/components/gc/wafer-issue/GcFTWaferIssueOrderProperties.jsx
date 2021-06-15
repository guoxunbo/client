import EntityProperties from "../../entityProperties/EntityProperties";
import OrderTable from "../../../../../components/Table/gc/OrderTable";
import { ActionType } from "../../../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import GcFTWaferIssueUnitScanProperties from "./GcFTWaferIssueUnitScanProperties";

export default class GcFTWaferIssueOrderProperties extends EntityProperties{

    static displayName = 'GcFTWaferIssueOrderProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    getTableData = () => {
        const self = this;
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
        return <OrderTable scrollY={200} ref={(orderTable) => { this.orderTable = orderTable }} pagination={false} asyncType={ActionType.AsyncWaferIssueOrder} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcFTWaferIssueUnitScanProperties 
                        orderTable={this.orderTable}
                        tableRrn={this.state.parameters.parameter1} 
                        waitIssueTableRrn={this.state.parameters.parameter2}
                        resetFlag={this.state.resetFlag} 
                        onSearch={this.getTableData.bind(this)}/>
    }
    
}