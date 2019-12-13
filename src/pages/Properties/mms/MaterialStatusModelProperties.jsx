import EntityProperties from "@properties/framework/EntityProperties";
import StatusModelTable from "@components/statusmachine/table/StatusModelTable";
import { EntityModel } from "@const/ConstDefine";

export default class MaterialStatusModelProperties extends EntityProperties{

    static displayName = 'MaterialStatusModelProperties';
    
    buildTable = () => {
        return <StatusModelTable eventModelClass={EntityModel.MaterialEvent} {...this.getDefaultTableProps()}  />
    }

}