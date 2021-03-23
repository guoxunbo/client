import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcRwMLotLabelPrintTable from "../../../components/Table/gc/GcRwMLotLabelPrintTable";

export default class GcRwMLotLabelPrintProperties extends EntityScanProperties{

    static displayName = 'GcRwMLotLabelPrintProperties';
    
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
        return <GcRwMLotLabelPrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}