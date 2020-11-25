import HKWaitReceiveMLotTable from "../../../components/Table/gc/HKWaitReceiveMLotTable";
import EntityProperties from "./entityProperties/EntityProperties";

export default class HKWaitReceiveMLotProperties extends EntityProperties{

    static displayName = 'HKWaitReceiveMLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <HKWaitReceiveMLotTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}