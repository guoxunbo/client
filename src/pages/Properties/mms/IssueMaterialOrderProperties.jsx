import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import IssueMaterialOrderTable from "@components/mms/table/IssueMaterialOrderTable";
import EntityProperties from "../framework/EntityProperties";
import IssueMaterialOrderScanProperties from "./IssueMaterialOrderScanProperties";

export default class IssueMaterialOrderProperties extends EntityProperties{

    static displayName = 'IssueMaterialOrderProperties' ;

    constructor (props) {
        super(props);
        this.state = {...this.state, parameterTabRrn: this.props.match.params.parameter1}
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

    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <IssueMaterialOrderTable
                    {...this.getDefaultTableProps()}
                    scrollY={200} 
                    pagination={false} 
                    ref={(orderTable) => { this.orderTable = orderTable }} 
                    issueMaterialScanTable = {this.issueMaterialScanTable}
                    resetData = {this.resetData}
        />
    }

    buildOtherComponent= () =>{
        return <IssueMaterialOrderScanProperties
                    tableRrn = {this.state.parameterTabRrn}  
                    orderTable = {this.orderTable} 
                    resetFlag = {this.state.resetFlag} 
                    ref={(issueMaterialScanTable) => { this.issueMaterialScanTable = issueMaterialScanTable }}
                    onSearch={this.getTableData.bind(this)}
        />
    }

}