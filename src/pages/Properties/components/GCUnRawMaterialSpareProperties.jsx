import GCUnRawMaterialSpareTable from "../../../components/Table/gc/GCUnRawMaterialSpareTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GCUnRawMaterialSpareProperties extends EntityScanProperties{

    static displayName = 'GCUnRawMaterialSpareProperties';
    
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
        return <GCUnRawMaterialSpareTable table={this.state.table} 
                                          data={this.state.tableData} 
                                          loading={this.state.loading} 
                                          resetData={this.resetData.bind(this)}
                                          resetFlag={this.state.resetFlag}/>
    }

}