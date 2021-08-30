import RawMaterialSpareOutDocTable from "../../../components/Table/gc/RawMaterialSpareOutDocTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";


export default class GCRawMaterialSpareOutDocProperties extends EntityScanProperties{

    static displayName='GCRawMaterialSpareOutDocProperties';

    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
        this.form.resetFormFileds();
    }

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
        return  <RawMaterialSpareOutDocTable rowKey={this.state.rowKey} 
                                  selectedRowKeys={this.state.selectedRowKeys} 
                                  selectedRows={this.state.selectedRows} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  resetData={this.resetData.bind(this)}
                                  onSearch={this.queryData.bind(this)} 
                                  loading={this.state.loading}                                  
                                   />
    }

}