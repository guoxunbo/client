import EntityProperties from "./entityProperties/EntityProperties";
import GcWaitForReceiveMLotUnitTable from "../../../components/Table/gc/GcWaitForReceiveMLotUnitTable";

export default class GcWaitForReceiveMLotUnitProperties extends EntityProperties{

    static displayName = 'GcWaitForReceiveMLotUnitProperties';

    componentWillReceiveProps = () => {
        this.queryData();
      }
    
    buildTable = () => {
        return <GcWaitForReceiveMLotUnitTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}