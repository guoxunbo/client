import FtMLotManagerRequest from "../../../../../api/gc/ft-materialLot-manager/FtMLotManagerRequest";
import GcFTWaitForIssueUnitTable from "../../../../../components/Table/gc/GcFTWaitForIssueUnitTable";
import EntityProperties from "../../entityProperties/EntityProperties";

export default class GcFTWaitForIssueUnitProperties extends EntityProperties{

    static displayName = 'GcFTWaitForIssueUnitProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }

    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
                tableData: responseBody.materialLotUnitList,
                loading: false
              });
          }
        }
        FtMLotManagerRequest.sendGetIssueUnitByTableRrnRequest(requestObject);
    }
    
    buildTable = () => {
        return <GcFTWaitForIssueUnitTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}