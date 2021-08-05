import ReturnMLotOrderProperties from "./ReturnMLotOrderProperties";
import DeptReturnLotOrderScanProperties from "./DeptReturnLotOrderScanProperties";

/**
 * 部门退料
 */
export default class DeptReturnLotOrderProperties extends ReturnMLotOrderProperties{

    static displayName = 'DeptReturnLotOrderProperties';

    buildOtherComponent = () => {
      return <DeptReturnLotOrderScanProperties
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(orderScanTable) => { this.orderScanTable = orderScanTable }}/>
  }

}