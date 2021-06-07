import EntityProperties from "@properties/framework/EntityProperties";
import VcMaterialLotInventoryScanProperties from "./VcMaterialLotInventoryScanProperties";
import VcMaterialLotInventoryTable from "@components/vc/table/VcMaterialLotInventoryTable";

/**
 * 下架 扫描单据带出待下架的物料
 */
export default class VcMaterialLotInventoryProperties extends EntityProperties{

    static displayName = 'VcMaterialLotInventoryProperties';
    
 
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <VcMaterialLotInventoryTable 
                        {...this.getDefaultTableProps()} 
                        scrollY={200} 
                        pagination={false} 
                        ref={(orderTable) => { this.orderTable = orderTable }}
                        materialLotScanProperties = {this.materialLotScanProperties}
                        resetData = {this.resetData} />
    }

    buildOtherComponent = () => {
        return <VcMaterialLotInventoryScanProperties
                        tableRrn = {this.state.parameters.parameter1}  
                        orderTable = {this.orderTable} 
                        resetFlag = {this.state.resetFlag} 
                        ref={(materialLotScanProperties) => { this.materialLotScanProperties = materialLotScanProperties }}
                        />
    }


}