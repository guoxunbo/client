import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMaterialLotCodePrintTable from "../../../components/Table/gc/GCMaterialLotCodePrintTable";


export default class GCMaterialLotCodePrintProperties extends EntityScanProperties{

    static displayName = 'GCMaterialLotCodePrintProperties';
    
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
        return <GCMaterialLotCodePrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}