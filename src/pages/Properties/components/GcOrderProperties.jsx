import EntityProperties from "./entityProperties/EntityProperties";
import OrderTable from "../../../components/Table/gc/OrderTable";

export default class GcOrderProperties extends EntityProperties{

    static displayName = 'GcOrderProperties';
    
    buildTable = () => {
        return <OrderTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}