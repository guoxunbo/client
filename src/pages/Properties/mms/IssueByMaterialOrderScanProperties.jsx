import IssueByMaterialOrderScanTable from "@components/mms/table/IssueByMaterialOrderScanTable";
import EntityScanProperties from "../framework/EntityScanProperties";

/**
 * 指定物料 发料
 */
export default class IssueByMaterialOrderScanProperties extends EntityScanProperties{

    static displayName = 'IssueByMaterialOrderScanProperties' ;

    constructor (props) {
        super(props);
        this.state = {...this.state}
    }
    
    buildTable = () => {
        return <IssueByMaterialOrderScanTable
                    {...this.getDefaultTableProps()}
                    scrollY={200} 
                    pagination={false} 
                    orderTable={this.props.orderTable} 
        />
    }
}