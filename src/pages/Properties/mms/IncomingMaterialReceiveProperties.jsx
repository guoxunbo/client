import EntityProperties from "@properties/framework/EntityProperties";
import IncomingMaterialReceiveScanProperties from "./IncomingMaterialReceiveScanProperties";
import IncomingMaterialReceiveTable from "@components/mms/table/IncomingMaterialReceiveTable";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";

//来料单
export default class IncomingMaterialReceiveProperties extends EntityProperties{

    static displayName = 'IncomingMaterialReceiveProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, showQueryFormButton: true }
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
          self.form.handleSearch();
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
      return <IncomingMaterialReceiveTable 
                                    {...this.getDefaultTableProps()}
                                    scrollY={200} 
                                    pagination={false} 
                                    ref={(orderTable) => { this.orderTable = orderTable }} 
                                    materialOrderScanProperties = {this.materialOrderScanProperties}
                                    resetData = {this.resetData}
                                    />
    }

    buildOtherComponent = () => {
      return <IncomingMaterialReceiveScanProperties
                                            tableRrn = {this.state.parameters.parameter1}  
                                            orderTable = {this.orderTable} 
                                            resetFlag = {this.state.resetFlag} 
                                            ref={(materialOrderScanProperties) => { this.materialOrderScanProperties = materialOrderScanProperties }}
                                            onSearch={this.getTableData.bind(this)}>
                                      </IncomingMaterialReceiveScanProperties>
  }

}