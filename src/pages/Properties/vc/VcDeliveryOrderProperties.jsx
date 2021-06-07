import AuthorityButton from "@components/framework/button/AuthorityButton";
import VcDeliveryOrderTable from "@components/vc/table/VcDeliveryOrderTable";
import { Upload } from "antd";
import EntityProperties from "../framework/EntityProperties";
import EntityScanProperties from "../framework/EntityScanProperties";


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
