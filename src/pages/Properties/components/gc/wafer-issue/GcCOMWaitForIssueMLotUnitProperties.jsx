import GcWaitForIssueMLotUnitTable from "../../../../../components/Table/gc/GcWaitForIssueMLotUnitTable";
import EntityProperties from "../../entityProperties/EntityProperties";

export default class GcWaitForIssueMLotUnitProperties extends EntityProperties{

    static displayName = 'GcWaitForIssueMLotUnitProperties';

    componentWillReceiveProps = () => {
        this.queryData();
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