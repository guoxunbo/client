import EntityProperties from "./entityProperties/EntityProperties";
import SpareMaterialTable from "../../../components/Table/SpareMaterialTable";

export default class SpareMaterialProperties extends EntityProperties{

    static displayName = 'MaterialProperties';
    
    buildTable = () => {
        return <SpareMaterialTable table={this.state.table}  data={this.state.tableData} loading={this.state.loading} />
    }

}