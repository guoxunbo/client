import VcShipmentOrderTable from "@components/vc/table/VcShipmentOrderTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class VcShipmentOrderProperties extends EntityProperties{

    static displayName =  'VcShipmentOrderProperties';

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
        return <VcShipmentOrderTable
                        {...this.getDefaultTableProps()}/>
    }
}
