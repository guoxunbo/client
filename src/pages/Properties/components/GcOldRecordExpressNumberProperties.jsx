import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import RecordExpressNumberOldTable from "../../../components/Table/gc/RecordExpressNumberOldTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GcOldRecordExpressNumberProperties extends EntityScanProperties{

    static displayName = 'GcOldRecordExpressNumberProperties';
    
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
    }

    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          self.setState({ 
            tableData: queryDatas,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <RecordExpressNumberOldTable 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            pagination={false}
                            loading={this.state.loading}
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag} />
    }

    
}