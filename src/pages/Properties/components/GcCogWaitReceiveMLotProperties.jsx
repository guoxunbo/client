import EntityProperties from "./entityProperties/EntityProperties";
import GcCogWaitReceiveMLotTable from "../../../components/Table/gc/GcCogWaitReceiveMLotTable";

export default class GcCogWaitReceiveMLotProperties extends EntityProperties{

    static displayName = 'GcCogWaitReceiveMLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
      }
    
    buildTable = () => {
        return <GcCogWaitReceiveMLotTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}