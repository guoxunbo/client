import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCHKWarehouseMLotCodePrintTable from "../../../components/Table/gc/GCHKWarehouseMLotCodePrintTable";


export default class GCHKWarehouseMLotCodePrintProperties extends EntityScanProperties{

    static displayName = 'GCHKWarehouseMLotCodePrintProperties';
    
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
        return <GCHKWarehouseMLotCodePrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}