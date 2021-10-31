import IssueByMLotOrderScanTable from "@components/mms/table/IssueByMLotOrderScanTable";
import EntityScanProperties from "../framework/EntityScanProperties";

/**
 * 指定批次 发料
 */
export default class IssueByMLotOrderScanProperties extends EntityScanProperties{

    static displayName = 'IssueByMLotOrderScanProperties' ;

    constructor (props) {
        super(props);
        this.state = {...this.state}
    }
    
    buildTable = () => {
        return <IssueByMLotOrderScanTable
                    {...this.getDefaultTableProps()}
                    scrollY={200} 
                    pagination={false} 
                    orderTable={this.props.orderTable} 
        />
    }
    
}