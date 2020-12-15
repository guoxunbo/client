import EntityProperties from "./entityProperties/EntityProperties";
import GcRMAWaitReceiveMaterialLotTable from "../../../components/Table/gc/GcRMAWaitReceiveMaterialLotTable";

export default class GcRMAWaitReceiveMaterialLotProperties extends EntityProperties{

    static displayName = 'GcRMAWaitReceiveMaterialLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <GcRMAWaitReceiveMaterialLotTable 
                                    pagination={true} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}