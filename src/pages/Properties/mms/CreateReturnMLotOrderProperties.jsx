import CreateReturnTable from "@components/mms/table/CreateReturnTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

/**
 * 创建退料单/退供应商
 */
export default class CreateReturnMLotOrderProperties extends EntityScanProperties{

    static displayName = 'CreateReturnMLotOrderProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTable=()=>{
        return( <CreateReturnTable
                {...this.getDefaultTableProps()}/>)
    }
}