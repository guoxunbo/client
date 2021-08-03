import EntityProperties from "@properties/framework/EntityProperties";
import VcUnReservedMLotCheckTable from "@components/vc/table/VcUnReservedMLotCheckTable";

/**
 * 取消备货
 */
export default class VcUnReservedMLotProperties extends EntityProperties{

    static displayName =  'VcUnReservedMLotProperties';

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
        return <VcUnReservedMLotCheckTable
                        {...this.getDefaultTableProps()}
                        scrollY={200} 
                        pagination={false} 
                        resetData = {this.resetData.bind(this)}
                        />
    }
}
