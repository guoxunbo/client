import DocStockUpScanTable from "@components/mms/table/DocStockUpScanTable";
import EntityScanProperties from "../framework/EntityScanProperties";

/**
 *单据备货
 */
export default class DocStockUpScanProperties extends EntityScanProperties{

    static displayName = 'DocStockUpScanProperties';

    buildTable = () =>{
        return <DocStockUpScanTable
                    {...this.getDefaultTableProps()} 
                    orderTable={this.props.orderTable} 
                    pagination={false} 
                    resetData={this.resetData.bind(this)}
                    resetFlag={this.state.resetFlag}
                    onSearch={this.props.onSearch}/>
    }
}