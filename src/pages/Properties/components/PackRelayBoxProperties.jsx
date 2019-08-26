import EntityScanProperties from "./entityProperties/EntityScanProperties";
import PackRelayBoxTable from "../../../components/Table/gc/PackRelayBoxTable";

/**
 * GC 包装中转箱。
 * 记录在物料批次上一个属性栏位即可。
 */
export default class PackRelayBoxProperties extends EntityScanProperties{

    static displayName = 'PackRelayBoxProperties';
      
    buildTable = () => {
        return <PackRelayBoxTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}