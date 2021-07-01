import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCRwMaterialCancelSpareTable from "../../../components/Table/gc/GCRwMaterialCancelSpareTable";
import EntityProperties from "./entityProperties/EntityProperties";

export default class GCRwMaterialCancelSpareProperties extends EntityProperties{

    static displayName = 'GCRwMaterialSpareProperties';
    
    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GCRwMaterialCancelSpareTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading}
                                    onSearch={this.queryData.bind(this)} 
                                    resetData={this.resetData.bind(this)}/>
    }

}