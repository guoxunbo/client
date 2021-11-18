import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCBondedWarehouseIncomingMaterialImportTable from "../../../components/Table/gc/GCBondedWarehouseIncomingMaterialImportTable";

export default class GCBondedWarehouseIncomingMaterialImportProperties  extends EntityScanProperties {

    static displayName = 'GCBondedWarehouseIncomingMaterialImportProperties';

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
        return <GCBondedWarehouseIncomingMaterialImportTable 
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