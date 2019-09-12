import EntityProperties from "./entityProperties/EntityProperties";
import OrderTable from "../../../components/Table/gc/OrderTable";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import GcReTestOrderMLotProperties from "./GcReTestOrderMLotProperties";

export default class GcReTestOrderProperties extends EntityProperties{

    static displayName = 'GcReTestOrderProperties';
    
    buildTable = () => {
        return <OrderTable scrollY={200} ref={(orderTable) => { this.orderTable = orderTable }} pagination={false} asyncType={ActionType.AsyncMaterialOutOrder} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcReTestOrderMLotProperties orderTable={this.orderTable} tableRrn={9912}></GcReTestOrderMLotProperties>
    }
}