import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReTestMLotTable from "../../../components/Table/gc/GcReTestMLotTable";
import GcStockOutMLotTable from "../../../components/Table/gc/GcStockOutMLotTable";

export default class GcStockOutOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcStockOutOrderMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    buildTable = () => {
        return <GcStockOutMLotTable orderTable={this.props.orderTable} pagination={false} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}