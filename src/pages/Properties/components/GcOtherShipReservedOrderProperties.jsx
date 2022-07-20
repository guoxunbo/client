import EntityProperties from "./entityProperties/EntityProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcOtherShipReservedMLotProperties from "./GcOtherShipReservedMLotProperties";
import OtherShipReservedOrderTable from "../../../components/Table/gc/OtherShipReservedOrderTable";

/**
 * 其他出备货单据
 */
export default class GcOtherShipReservedOrderProperties extends EntityProperties{

    static displayName = 'GcOtherShipReservedOrderProperties';
    
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
      this.resetReferenceData(responseBody.dataList, "reserved8");
      this.setState({
        tableData: responseBody.dataList,
        loading: false,
        whereClause: whereClause
      });
    }
    
    buildTable = () => {
        return <OtherShipReservedOrderTable scrollY={200} pagination={false} 
                                    ref={(orderTable) => { this.orderTable = orderTable }} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    reservedLotTable={this.reservedLotTable}/>
    }

    buildOtherComponent = () => {
        return <GcOtherShipReservedMLotProperties 
                  ref={(reservedLotTable) => { this.reservedLotTable = reservedLotTable }} 
                  orderTable={this.orderTable} 
                  tableRrn={this.state.parameters.parameter1}
                  resetFlag={this.state.resetFlag}
                  onSearch={this.getTableData.bind(this)}>
                  </GcOtherShipReservedMLotProperties>
    }

}