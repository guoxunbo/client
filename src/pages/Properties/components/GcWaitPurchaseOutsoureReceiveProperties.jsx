import EntityProperties from "./entityProperties/EntityProperties";
import GcWaitPurchaseOutReceiveMLotUnitTable from "../../../components/Table/gc/GcWaitPurchaseOutReceiveMLotUnitTable";

export default class GcWaitPurchaseOutsoureReceiveProperties extends EntityProperties{

    static displayName = 'GcWaitPurchaseOutsoureReceiveProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <GcWaitPurchaseOutReceiveMLotUnitTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}