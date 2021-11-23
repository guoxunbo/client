import EntityProperties from "../../entityProperties/EntityProperties";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";
import GcWaitOutOrderIssueMLotUnitTable from "../../../../../components/Table/gc/GcWaitOutOrderIssueMLotUnitTable";

export default class GcWaitOutOrderIssueMLotUnitProperties extends EntityProperties{

    static displayName = 'GcWaitOutOrderIssueMLotUnitProperties';

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
        return <GcWaitOutOrderIssueMLotUnitTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}