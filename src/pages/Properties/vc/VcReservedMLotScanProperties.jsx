import VcReservedMLotScanTable from "@components/vc/table/VcReservedMLotScanTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class VcReservedMLotScanProperties extends EntityProperties{

    static displayName =  'VcReservedMLotScanProperties';

    constructor (props){
        super(props);
        this.state = {...this.state, waitReleaseQty:'0'};
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
        return <VcReservedMLotScanTable
                    {...this.getDefaultTableProps()} 
                    orderTable={this.props.orderTable} 
                    pagination={false} 
                    resetData={this.resetData.bind(this)}
                    resetFlag={this.state.resetFlag}
                    onSearch={this.props.onSearch}
                    />
    }

}
