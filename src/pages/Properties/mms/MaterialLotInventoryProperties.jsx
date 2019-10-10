import EntityProperties from "@properties/framework/EntityProperties";
import MaterialLotInventoryTable from "@components/mms/table/MaterialLotInventoryTable";

export default class MaterialLotInventoryProperties extends EntityProperties{

    static displayName = 'MaterialStaMaterialPropertiestusModelProperties';
    
    buildTable = () => {
        return <MaterialLotInventoryTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}