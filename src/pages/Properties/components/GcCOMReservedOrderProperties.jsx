import EntityProperties from "./entityProperties/EntityProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcCOMReservedMLotProperties from "./GcCOMReservedMLotProperties";
import COMReservedOrderTable from "../../../components/Table/gc/COMReservedOrderTable";

/**
 * COM备货
 */
export default class GcCOMReservedOrderProperties extends EntityProperties{

    static displayName = 'GcCOMReservedOrderProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
        this.resetReferenceData(null, null);
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

    afterQuery = (responseBody, whereClause) => {
      this.resetReferenceData(responseBody.dataList, "reserved12");
      this.setState({
        tableData: responseBody.dataList,
        loading: false,
        whereClause: whereClause
      });
    }
    
    buildTable = () => {
        return <COMReservedOrderTable scrollY={200} pagination={false} 
                                    ref={(orderTable) => { this.orderTable = orderTable }} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    reservedLotTable={this.reservedLotTable}/>
    }

    buildOtherComponent = () => {
        return <GcCOMReservedMLotProperties 
                  ref={(reservedLotTable) => { this.reservedLotTable = reservedLotTable }} 
                  orderTable={this.orderTable} 
                  tableRrn={this.state.parameters.parameter1}
                  resetFlag={this.state.resetFlag}
                  onSearch={this.getTableData.bind(this)}>
                  </GcCOMReservedMLotProperties>
    }

}