import EntityScanProperties from "@properties/framework/EntityScanProperties";
import MaterialLotStockInTable from "@components/mms/table/MaterialLotStockInTable";

/**
 * 物料批次扫描添加后入库
 * 
 */
export default class MaterialLotStockInProperties extends EntityScanProperties{

    static displayName = 'MaterialLotStockInProperties';
    
    buildTable = () => {
        return <MaterialLotStockInTable 
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