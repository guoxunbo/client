import EntityProperties from "./entityProperties/EntityProperties";
import GCUnRawMaterialSpareTable from "../../../components/Table/gc/GCUnRawMaterialSpareTable";

export default class GCUnRawMaterialSpareProperties extends EntityProperties{

    static displayName = 'GCUnRawMaterialSpareProperties';
    

    buildTable = () => {
        return <GCUnRawMaterialSpareTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}