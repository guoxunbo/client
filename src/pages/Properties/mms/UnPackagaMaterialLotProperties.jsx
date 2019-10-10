import EntityDoubleScanProperties from "@properties/framework/EntityDoubleScanProperties";
import UnPackMaterialLotTable from "@components/mms/table/UnPackMaterialLotTable";

/**
 * 拆包
 */
export default class UnPackagaMaterialLotProperties extends EntityDoubleScanProperties{

    static displayName = 'UnPackagaMaterialLotProperties';
      
    buildTable = () => {
        return <UnPackMaterialLotTable pagination={false} 
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