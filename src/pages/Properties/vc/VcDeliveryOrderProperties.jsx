import VcDeliveryOrderTable from "@components/vc/table/VcDeliveryOrderTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 发货单导入，打印
 */
export default class VcDeliveryOrderProperties extends EntityProperties{

    static displayName =  'VcDeliveryOrderProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    } 

    buildTable =()=>{
        return <VcDeliveryOrderTable
                        {...this.getDefaultTableProps()}/>
    }
}
