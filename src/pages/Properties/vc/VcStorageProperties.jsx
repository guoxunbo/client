import VcStorageTable from "@components/vc/table/VcStorageTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 库位管理
 */
export default class VcStorageProperties extends EntityProperties{

    static displayName =  'VcStorageProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }

    buildTable =()=>{
        return <VcStorageTable
                        {...this.getDefaultTableProps()}/>
    }

    

}
