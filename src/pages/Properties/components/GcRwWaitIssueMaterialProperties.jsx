import EntityProperties from "./entityProperties/EntityProperties";
import GcWaitIssueMaterialTable from "../../../components/Table/gc/GcWaitIssueMaterialTable";

export default class GcRwWaitIssueMaterialProperties extends EntityProperties{

    static displayName = 'GcRwWaitIssueMaterialProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <GcWaitIssueMaterialTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}