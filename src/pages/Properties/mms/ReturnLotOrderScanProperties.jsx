import ReturnLotOrderScanTable from "@components/mms/table/ReturnLotOrderScanTable";
import ReturnMLotOrderScanProperties from "./ReturnMLotOrderScanProperties";

/**
 * 退货
 * 客户退回
 */
 export default class ReturnLotOrderScanProperties extends ReturnMLotOrderScanProperties{

      static displayName = 'ReturnLotOrderScanProperties';

      buildTable = () => {
          return <ReturnLotOrderScanTable
                    {...this.getDefaultTableProps()} 
                    orderTable={this.props.orderTable} 
                    pagination={false} 
                    resetData={this.resetData.bind(this)} 
                    resetFlag={this.state.resetFlag} />
      }
}