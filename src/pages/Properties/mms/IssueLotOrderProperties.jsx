import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import IssueLotOrderTable from "@components/mms/table/IssueLotOrderTable";
import EntityProperties from "@properties/framework/EntityProperties";
import IssueLotOrderScanProperties from "./IssueLotOrderScanProperties";

export default class IssueLotOrderProperties extends EntityProperties{

    static displayName = 'IssueLotOrderProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, parameterTabRrn: this.props.match.params.parameter1 }
    }
   
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
                  issueLotScanTable = {this.issueLotScanTable}
                  resetData = {this.resetData}
      />
    }

    buildOtherComponent = () => {
      return <IssueLotOrderScanProperties
                  tableRrn = {this.state.parameterTabRrn}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(issueLotScanTable) => { this.issueLotScanTable = issueLotScanTable }}
                  onSearch={this.getTableData.bind(this)}
      />
  }

}