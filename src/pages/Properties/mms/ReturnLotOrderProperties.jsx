import ReturnMLotOrderProperties from "./ReturnMLotOrderProperties";
import ReturnLotOrderScanProperties from "./ReturnLotOrderScanProperties";

/**
 * 退货
 * 客户退回
 */
export default class ReturnLotOrderProperties extends ReturnMLotOrderProperties{

    static displayName = 'ReturnLotOrderProperties';

    buildOtherComponent = () => {
      return <ReturnLotOrderScanProperties
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(orderScanTable) => { this.orderScanTable = orderScanTable }}/>
  }

}