import ReturnOrderScanTable from "@components/mms/table/ReturnOrderScanTable";
import ReturnMLotOrderScanProperties from "./ReturnMLotOrderScanProperties";

/**
 * 仓库退到供应商
 */
export default class ReturnOrderScanProperties extends ReturnMLotOrderScanProperties{

    static displayName = 'ReturnOrderScanProperties';

    buildTable = () => {
        return <ReturnOrderScanTable {...this.getDefaultTableProps()} 
            orderTable={this.props.orderTable} pagination={false} resetData={this.resetData.bind(this)} 
            resetFlag={this.state.resetFlag} />
    }
}