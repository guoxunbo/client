import RawMaterialWaitStockInStorageTable from "../../../components/Table/gc/RawMaterialWaitStockInStorageTable";
import EntityProperties from "..";

export default class GcRawMaterialWaitStockInProperties extends EntityProperties{

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