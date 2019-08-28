import EntityScanProperties from "./entityProperties/EntityScanProperties";
import UnPackMaterialLotTable from "../../../components/Table/UnPackMaterialLotTable";

/**
 * 拆包
 */
export default class UnPackagaMaterialLotProperties extends EntityScanProperties{

    static displayName = 'PackCaseCheckProperties';
      
    buildTable = () => {
        return <UnPackMaterialLotTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}