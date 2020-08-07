import EntityProperties from "./entityProperties/EntityProperties";
import GCProductModelConversionTable from "../../../components/Table/gc/GCProductModelConversionTable";

export default class GCProductModelConversionProperties  extends EntityProperties {

    static displayName = 'GCProductModelConversionProperties';

    buildTable = () => {
        return <GCProductModelConversionTable  table={this.state.table}  data={this.state.tableData} loading={this.state.loading} />
    }
}