import EntityProperties from "@properties/framework/EntityProperties";
import MaterialLotInventoryTable from "@components/mms/table/MaterialLotInventoryTable";

export default class MaterialLotInventoryProperties extends EntityProperties{

    static displayName = 'MaterialLotInventoryProperties';
    
    buildTable = () => {
        return <MaterialLotInventoryTable {...this.getDefaultTableProps()}  />
    }

}