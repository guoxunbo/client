import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCHNWarehouseImportTable from "../../../components/Table/gc/GCHNWarehouseImportTable";

export default class GCHNWarehouseImportProperties  extends EntityScanProperties {

    static displayName = 'GCHNWarehouseImportProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <GCHNWarehouseImportTable
                    pagination={true} 
                    propsFrom = {this.form}
                    rowKey={this.state.rowKey} 
                    ref={(showTable) => { this.showTable = showTable }} 
                    table={this.state.table} 
                    data={this.state.tableData} 
                    loading={this.state.loading} 
                    resetData={this.resetData.bind(this)}/>
    }
}