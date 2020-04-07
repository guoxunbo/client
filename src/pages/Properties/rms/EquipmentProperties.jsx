import EntityProperties from "@properties/framework/EntityProperties";
import EquipmentTable from "@components/rms/table/EquipmentTable";

export default class EquipmentProperties extends EntityProperties{

    static displayName = 'EquipmentRecipeProperties';
    
    buildTable = () => {
        return <EquipmentTable {...this.getDefaultTableProps()}/>
    }
}