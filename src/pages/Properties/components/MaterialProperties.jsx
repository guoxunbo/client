import EntityProperties from "./entityProperties/EntityProperties";
import MaterialTable from "../../../components/Table/MaterialTable";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";

export default class MaterialProperties extends EntityProperties{

    static displayName = 'MaterialProperties';
    
    buildTable = () => {
        return <MaterialTable table={this.state.table}  data={this.state.tableData} loading={this.state.loading} />
    }

}