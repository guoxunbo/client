import EntityProperties from "./entityProperties/EntityProperties";
import GcWaitForReTestMLotTable from "../../../components/Table/gc/GcWaitForReTestMLotTable";

export default class GcWaitForReTestMLotProperties extends EntityProperties{

    static displayName = 'GcWaitForReTestMLotProperties';
    
    buildTable = () => {
        return <GcWaitForReTestMLotTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}