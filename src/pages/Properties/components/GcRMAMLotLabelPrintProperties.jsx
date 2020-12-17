import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcRMAMLotLabelPrintTable from "../../../components/Table/gc/GcRMAMLotLabelPrintTable";

export default class GcRMAMLotLabelPrintProperties extends EntityScanProperties{

    static displayName = 'GcRMAMLotLabelPrintProperties';
    
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
        return <GcRMAMLotLabelPrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}