import EntityProperties from "../../entityProperties/EntityProperties";
import OrderTable from "../../../../../components/Table/gc/OrderTable";
import { ActionType } from "../../../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import GcCOMWaferIssueMLotUnitScanProperties from "./GcCOMWaferIssueMLotUnitScanProperties";

export default class GcCOMWaferIssueOrderProperties extends EntityProperties{

    static displayName = 'GcCOMWaferIssueOrderProperties';
    
    /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
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
        return <GcCOMWaferIssueMLotUnitScanProperties orderTable={this.orderTable} tableRrn={this.state.parameters.parameter1} waitTableRrn={this.state.parameters.parameter2} resetFlag={this.state.resetFlag} onSearch={this.getTableData.bind(this)}/>
    }
    
}