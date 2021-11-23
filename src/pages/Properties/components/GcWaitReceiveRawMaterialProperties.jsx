import EntityProperties from "./entityProperties/EntityProperties";
import GcWaitReceiveRawMaterialTable from "../../../components/Table/gc/GcWaitReceiveRawMaterialTable";

export default class GcWaitReceiveRawMaterialProperties extends EntityProperties{

    static displayName = 'GcWaitReceiveRawMaterialProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <GcWaitReceiveRawMaterialTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}