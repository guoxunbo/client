import EntityScanProperties from "./entityProperties/EntityScanProperties";
import RawMaterialWaitStockInStorageTable from "../../../components/Table/gc/RawMaterialWaitStockInStorageTable";

export default class GcRawMaterialWaitStockInProperties extends EntityScanProperties{

    static displayName = 'GcRawMaterialWaitStockInProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    buildTable = () => {
        return <RawMaterialWaitStockInStorageTable 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}