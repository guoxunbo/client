import RetryInterfaceTable from "@components/mms/table/RetryInterfaceTable";
import EntityProperties from "../framework/EntityProperties";

/**
 * 接口重发
 */
export default class RetryInterfaceProperties extends EntityProperties{

    static displayName = 'RetryInterfaceProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTable=()=>{
        return( <RetryInterfaceTable
                {...this.getDefaultTableProps()}/>)
    }
}