import EntityProperties from "@properties/framework/EntityProperties";
import EntityListVersionControlTable from "@components/framework/table/EntityListVersionControlTable";

export default class EquipmentRecipeProperties extends EntityProperties{

    static displayName = 'EquipmentRecipeProperties';
    
    buildTable = () => {
        return <EntityListVersionControlTable {...this.getDefaultTableProps()}/>
    }
    
}