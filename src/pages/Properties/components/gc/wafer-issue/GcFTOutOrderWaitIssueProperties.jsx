import FtMLotManagerRequest from "../../../../../api/gc/ft-materialLot-manager/FtMLotManagerRequest";
import GcFTOutOrderWaitIssueUnitTable from "../../../../../components/Table/gc/GcFTOutOrderWaitIssueUnitTable";
import EntityProperties from "../../entityProperties/EntityProperties";

export default class GcFTOutOrderWaitIssueProperties extends EntityProperties{

    static displayName = 'GcFTOutOrderWaitIssueProperties';

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
        return <GcFTOutOrderWaitIssueUnitTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}