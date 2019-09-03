import EntityProperties from "./entityProperties/EntityProperties";
import OrderTable from "../../../components/Table/gc/OrderTable";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";

export default class GcOrderProperties extends EntityProperties{

    static displayName = 'GcOrderProperties';
    
    buildTable = () => {
        return <OrderTable asyncType={ActionType.AsyncSo} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}