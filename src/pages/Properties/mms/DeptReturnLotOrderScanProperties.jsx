import DeptReturnLotOrderScanTable from "@components/mms/table/DeptReturnLotOrderScanTable";
import ReturnMLotOrderScanProperties from "./ReturnMLotOrderScanProperties";

/**
 * 部门退料
 */
 export default class DeptReturnLotOrderScanProperties extends ReturnMLotOrderScanProperties{

      static displayName = 'DeptReturnLotOrderScanProperties';

      buildTable = () => {
          return <DeptReturnLotOrderScanTable
                    {...this.getDefaultTableProps()} 
                    orderTable={this.props.orderTable} 
                    pagination={false} 
                    resetData={this.resetData.bind(this)} 
                    resetFlag={this.state.resetFlag} />
      }
}