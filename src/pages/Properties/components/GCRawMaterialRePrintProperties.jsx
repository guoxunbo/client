import GcRawMaterialLabelPrintTable from "../../../components/Table/gc/GcRawMaterialLabelPrintTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GCRawMaterialRePrintProperties extends EntityScanProperties{

    static displayName = 'GCRawMaterialRePrintProperties';
    
    constructor(props) {
        super(props);
    }
  
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
  }

    buildTable = () => {
        return <GcRawMaterialLabelPrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}