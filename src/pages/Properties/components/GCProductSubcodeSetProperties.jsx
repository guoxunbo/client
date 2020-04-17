import EntityProperties from "./entityProperties/EntityProperties";
import GCProductSubcodeSetTable from "../../../components/Table/gc/GCProductSubcodeSetTable";

export default class GCProductSubcodeSetProperties  extends EntityProperties {

    static displayName = 'GCProductSubcodeSetProperties';

    buildTable = () => {
        return <GCProductSubcodeSetTable  table={this.state.table}  data={this.state.tableData} loading={this.state.loading} />
    }
}