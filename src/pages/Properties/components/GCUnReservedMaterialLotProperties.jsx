import EntityProperties from "./entityProperties/EntityProperties";
import UnReserverdMaterialLotTable from "../../../components/Table/gc/UnReserverdMaterialLotTable";

export default class GCUnReservedMaterialLotProperties extends EntityProperties{

    static displayName = 'GCUnReservedMaterialLotProperties';
    
    buildTable = () => {
        return <UnReserverdMaterialLotTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}