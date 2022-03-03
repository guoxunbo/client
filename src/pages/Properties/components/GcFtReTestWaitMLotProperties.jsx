import EntityProperties from "./entityProperties/EntityProperties";
import GcFtReTestWaitMLotTable from "../../../components/Table/gc/GcFtReTestWaitMLotTable";

export default class GcFtReTestWaitMLotProperties extends EntityProperties{

    static displayName = 'GcFtReTestWaitMLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <GcFtReTestWaitMLotTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}