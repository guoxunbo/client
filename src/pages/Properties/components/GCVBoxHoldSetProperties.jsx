import EntityProperties from "./entityProperties/EntityProperties";
import GCVBoxHoldSetTable from "../../../components/Table/gc/GCVBoxHoldSetTable";

export default class GCVBoxHoldSetProperties  extends EntityProperties {

    static displayName = 'GCVBoxHoldSetProperties';

    buildTable = () => {
        return <GCVBoxHoldSetTable  table={this.state.table}  data={this.state.tableData} loading={this.state.loading} />
    }
}