import EntityDoubleScanProperties from "./entityProperties/EntityDoubleScanProperties";
import GCIRAUnPackageTable from "../../../components/Table/gc/GCIRAUnPackageTable";

export default class GCIRAUnPackageProperties extends EntityDoubleScanProperties{

    static displayName = 'GCIRAUnPackageProperties';
      
    buildTable = () => {
        return <GCIRAUnPackageTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}/>
    }

}