import EntityProperties from "./entityProperties/EntityProperties";
import OrderTable from "../../../components/Table/gc/OrderTable";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import GcStockOutOrderMLotProperties from "./GcStockOutOrderMLotProperties";

export default class GcOrderProperties extends EntityProperties{

    static displayName = 'GcOrderProperties';
    
    buildTable = () => {
        return <OrderTable ref={(orderTable) => { this.orderTable = orderTable }} asyncType={ActionType.AsyncSo} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <GcStockOutOrderMLotProperties orderTable={this.orderTable} tableRrn={9913}></GcStockOutOrderMLotProperties>
    }

}