import EntityProperties from "./entityProperties/EntityProperties";
import GcFTWaitReceiveMaterialLotTable from "../../../components/Table/gc/GcFTWaitReceiveMaterialLotTable";

export default class GcFTWaitReceiveMaterialLotProperties extends EntityProperties{

    static displayName = 'GcFTWaitReceiveMaterialLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <GcFTWaitReceiveMaterialLotTable 
                                    pagination={true} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}