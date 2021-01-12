import EntityProperties from "./entityProperties/EntityProperties";
import GcRawMaterialWaitIssueMLotTable from "../../../components/Table/gc/GcRawMaterialWaitIssueMLotTable";

export default class GcRawMaterialWaitIssueMLotProperties extends EntityProperties{

    static displayName = 'GcRawMaterialWaitIssueMLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }

    buildTable = () => {
        return <GcRawMaterialWaitIssueMLotTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}