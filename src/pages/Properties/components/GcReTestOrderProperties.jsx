import EntityProperties from "./entityProperties/EntityProperties";
import OrderTable from "../../../components/Table/gc/OrderTable";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";

export default class GcReTestOrderProperties extends EntityProperties{

    static displayName = 'GcReTestOrderProperties';
    
    buildTable = () => {
        return <OrderTable asyncType={ActionType.AsyncMaterialOutOrder} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}