import VcDeliveryOrderTable from "@components/vc/table/VcDeliveryOrderTable";
import EntityProperties from "../framework/EntityProperties";


/**
 * 发货单导入
 */
export default class VcDeliveryOrderProperties extends EntityProperties{

    static displayName =  'VcDeliveryOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    buildTable = () => {
        return (<VcDeliveryOrderTable
                {...this.getDefaultTableProps()} /> 
                
          )
    }

}
