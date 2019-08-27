import EntityScanProperties from "./entityProperties/EntityScanProperties";
import PackCaseCheckTable from "../../../components/Table/gc/PackCaseCheckTable";

/**
 * GC 装箱检验
 * 记录在物料批次上一个属性栏位即可。
 */
export default class PackCaseCheckProperties extends EntityScanProperties{

    static displayName = 'PackCaseCheckProperties';
      
    buildTable = () => {
        return <PackCaseCheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}