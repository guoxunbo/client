import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReTestMLotTable from "../../../components/Table/gc/GcReTestMLotTable";

export default class GcReTestOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcReTestOrderMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    buildTable = () => {
        return <GcReTestMLotTable orderTable={this.props.orderTable} pagination={false} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}