import EntityProperties from "@properties/framework/EntityProperties";
import MaterialLotTable from "@components/Table/MaterialLotTable";

export default class MaterialLotProperties extends EntityProperties{

    static displayName = 'MaterialLotProperties';
    
    buildTable = () => {
        return <MaterialLotTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}