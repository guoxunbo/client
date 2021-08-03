import EntityProperties from "@properties/framework/EntityProperties";
import LabMaterialTable from "@components/mms/table/LabMaterialTable";

export default class LabMaterialProperties extends EntityProperties{

    static displayName = 'LabMaterialProperties';
    
    buildTable = () => {
        return <LabMaterialTable {...this.getDefaultTableProps()} />
    }

}