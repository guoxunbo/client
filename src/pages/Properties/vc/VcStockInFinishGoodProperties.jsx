
import VcStockInFinishGoodTable from '@components/vc/table/VcStockInFinishGoodTable';
import EntityScanProperties from '@properties/framework/EntityScanProperties';


/**
 * 成品入库
 */
export default class VcStockInFinishGoodProperties extends EntityScanProperties {

    static displayName = 'VcStockInFinishGoodProperties';

    constructor(props) {
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
    
    buildTable = () => {
        return <VcStockInFinishGoodTable
                                {...this.getDefaultTableProps()}
                                    pagination={false}
                                    resetData ={this.resetData} />
    }
}


