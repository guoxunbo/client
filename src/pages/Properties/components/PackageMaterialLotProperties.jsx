import EntityScanProperties from "./entityProperties/EntityScanProperties";
import PackMaterialLotTable from "../../../components/Table/PackMaterialLotTable";

const rowKey = "packedLotRrn";

export default class PackageMaterialLotProperties extends EntityScanProperties{

    static displayName = 'PackageMaterialLotProperties';
      
    buildTable = () => {
        return <PackMaterialLotTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}