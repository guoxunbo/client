import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMaterialLotReleaseTable from "../../../components/Table/gc/GCMaterialLotReleaseTable";
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';

export default class GCMaterialLotReleaseProperties  extends EntityScanProperties {

    static displayName = 'GCMaterialLotReleaseProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <GCMaterialLotReleaseTable    
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
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
}