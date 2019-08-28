import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockOutCheckTable from "../../../components/Table/gc/StockOutCheckTable";

/**
 * GC 出货前检验
 */
export default class StockOutCheckProperties extends EntityScanProperties{

    static displayName = 'StockOutCheckProperties';
      
    buildTable = () => {
        return <StockOutCheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}