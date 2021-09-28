import CreateDeptReturnTable from "@components/mms/table/CreateDeptReturnTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

/**
 * 创建部门退料
 */
export default class CreateDeptReturnProperties extends EntityScanProperties{

    static displayName = 'CreateDeptReturnProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTable=()=>{
        return( <CreateDeptReturnTable
                {...this.getDefaultTableProps()}
                createDeptReturnActionTableName = {this.state.parameters.parameter1}/>)
    }
}