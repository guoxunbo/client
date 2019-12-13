import EntityScanProperties from "@properties/framework/EntityScanProperties";
import MaterialLotStockInTable from "@components/mms/table/MaterialLotStockInTable";

/**
 * 物料批次扫描添加后入库
 * 
 */
export default class MaterialLotStockInProperties extends EntityScanProperties{

    static displayName = 'MaterialLotStockInProperties';
    
    buildTable = () => {
        return <MaterialLotStockInTable {...this.getDefaultTableProps()} 
                                    pagination={false} />
    }

}