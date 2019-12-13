import EntityProperties from "@properties/framework/EntityProperties";
import MaterialLotTable from "@components/mms/table/MaterialLotTable";

export default class MaterialLotProperties extends EntityProperties{

    static displayName = 'MaterialLotProperties';
    
    buildTable = () => {
        return <MaterialLotTable {...this.getDefaultTableProps()}  />
    }

}