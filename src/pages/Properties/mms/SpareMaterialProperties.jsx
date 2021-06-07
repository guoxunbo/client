import SpareMaterialTable from "@components/mms/table/SpareMaterialTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 备件物料
 * 创建或更改物料，接收入库
 */
export default class SpareMaterialProperties extends EntityProperties{

    static displayName = 'SpareMaterialProperties';
    
    buildTable = () => {
        return <SpareMaterialTable {...this.getDefaultTableProps()} />
    }

}