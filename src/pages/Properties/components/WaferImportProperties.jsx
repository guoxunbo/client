import EntityProperties from "./entityProperties/EntityProperties";
import WaferImportTable from "../../../components/Table/WaferImportTable";
export default class WaferImportProperties extends EntityProperties{

    static displayName = 'WaferImportProperties';

  
    buildTable = () => {
        return <WaferImportTable 
                    pagination={false} 
                    rowKey={this.state.rowKey} 
                    selectedRowKeys={this.state.selectedRowKeys} 
                    selectedRows={this.state.selectedRows} 
                    table={this.state.table} 
                    data={this.state.tableData} 
                    loading={this.state.loading} 
                    resetData={this.resetData.bind(this)}/>
    }

}