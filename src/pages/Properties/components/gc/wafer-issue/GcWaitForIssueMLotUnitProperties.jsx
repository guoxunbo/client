import GcWaitForIssueMLotUnitTable from "../../../../../components/Table/gc/GcWaitForIssueMLotUnitTable";
import EntityProperties from "../../entityProperties/EntityProperties";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";

export default class GcWaitForIssueMLotUnitProperties extends EntityProperties{

    static displayName = 'GcWaitForIssueMLotUnitProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }

    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            self.setState({
                tableData: responseBody.materialLotList,
                loading: false
              });
          }
        }
        WaferManagerRequest.sendGetMaterialLotByRrnRequest(requestObject);
    }
    
    buildTable = () => {
        return <GcWaitForIssueMLotUnitTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}