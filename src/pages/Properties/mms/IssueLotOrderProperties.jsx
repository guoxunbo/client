import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import IssueLotOrderTable from "@components/mms/table/IssueLotOrderTable";
import EntityProperties from "@properties/framework/EntityProperties";
import IssueLotOrderScanProperties from "./IssueLotOrderScanProperties";

/**
 * 发往mes的发料(主材 辅材 成品)通用
 */
export default class IssueLotOrderProperties extends EntityProperties{

    static displayName = 'IssueLotOrderProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, parameterTabRrn: this.props.match.params.parameter1 }
    }
   
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
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }
    
    buildTable = () => {
      return <IssueLotOrderTable
                  {...this.getDefaultTableProps()}
                  scrollY={200} 
                  pagination={false} 
                  ref={(orderTable) => { this.orderTable = orderTable }} 
                  issueLotScanProperties = {this.issueLotScanProperties}
                  resetData = {this.resetData}
      />
    }

    buildOtherComponent = () => {
      return <IssueLotOrderScanProperties
                  tableRrn = {this.state.parameterTabRrn}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(issueLotScanProperties) => { this.issueLotScanProperties = issueLotScanProperties }}
                  onSearch={this.getTableData.bind(this)}
      />
  }

}