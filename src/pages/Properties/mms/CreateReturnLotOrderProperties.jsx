import ImportReturnLotOrder from "@components/mms/table/ImportReturnLotOrder";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

/**
 * 创建退货单
 */
export default class CreateReturnLotOrderProperties extends EntityScanProperties{

    static displayName = 'CreateReturnLotOrderProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTable=()=>{
        return( <ImportReturnLotOrder
                {...this.getDefaultTableProps()}
                importTypeNbTable = {this.state.parameters.parameter1}/>)
    }
}