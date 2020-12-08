import EntityProperties from "./entityProperties/EntityProperties";
import CogReceiveOrderTable from "../../../components/Table/gc/CogReceiveOrderTable";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcCogReceiveMLotScanProperties from "./GcCogReceiveMLotScanProperties";

export default class GcCogReceiveOrderProperties extends EntityProperties{

    static displayName = 'GcCogReceiveOrderProperties';
    
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
        return <CogReceiveOrderTable scrollY={200} 
                                     ref={(orderTable) => { this.orderTable = orderTable }} 
                                     pagination={false} 
                                     asyncType={ActionType.AsyncCogReceiveOrder} 
                                     table={this.state.table} 
                                     data={this.state.tableData} 
                                     loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcCogReceiveMLotScanProperties orderTable={this.orderTable} tableRrn={467727} resetFlag={this.state.resetFlag} onSearch={this.getTableData.bind(this)}/>
    }
    
}