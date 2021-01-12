import IncomingMaterialDeleteTable from "@components/mms/table/IncomingMaterialDeleteTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class IncomingMaterialDeleteProperties extends EntityProperties{

    static displayName = 'IncomingMaterialDeleteProperties';

    buildTable = () => {
        return <IncomingMaterialDeleteTable
                        {...this.getDefaultTableProps()} 
        />
    }

}