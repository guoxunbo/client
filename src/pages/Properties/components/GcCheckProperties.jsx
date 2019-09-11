import EntityScanProperties from "./entityProperties/EntityScanProperties";
import CheckTable from "../../../components/Table/gc/CheckTable";

/**
 * GC 盘点
 */
export default class GcCheckProperties extends EntityScanProperties{

    static displayName = 'GcOrderProperties';
    
    buildTable = () => {
        return <CheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}