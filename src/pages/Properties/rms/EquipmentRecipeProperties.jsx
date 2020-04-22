import EntityTreeProperties from "@properties/framework/EntityTreeProperties";
import EqpRecipeTable from "@components/rms/table/EqpRecipeTable";

export default class EquipmentRecipeProperties extends EntityTreeProperties{

    static displayName = 'EquipmentRecipeProperties';
    
    buildTable = () => {
        return <EqpRecipeTable {...this.getTableTreeProps()}/>
    }
    
}