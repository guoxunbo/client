import EntityProperties from "@properties/framework/EntityProperties";
import EqpRecipeTable from "@components/rms/table/EqpRecipeTable";

export default class EquipmentRecipeProperties extends EntityProperties{

    static displayName = 'EquipmentRecipeProperties';
    
    buildTable = () => {
        return <EqpRecipeTable {...this.getDefaultTableProps()}/>
    }
    
}