import EntityDoubleScanProperties from "@properties/framework/EntityDoubleScanProperties";
import UnPackMaterialLotTable from "@components/mms/table/UnPackMaterialLotTable";

/**
 * 拆包
 */
export default class UnPackagaMaterialLotProperties extends EntityDoubleScanProperties{

    static displayName = 'UnPackagaMaterialLotProperties';
      
    buildTable = () => {
        return <UnPackMaterialLotTable pagination={false} {...this.getDefaultTableProps()} />
    }

}