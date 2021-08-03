import ReturnOrderScanProperties from "./ReturnOrderScanProperties";
import ReturnMLotOrderProperties from "./ReturnMLotOrderProperties";

/**
 * 仓库退到供应商
 */
export default class ReturnOrderProperties extends ReturnMLotOrderProperties{

    static displayName = 'ReturnOrderProperties';

    buildOtherComponent = () => {
      return <ReturnOrderScanProperties
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(orderScanTable) => { this.orderScanTable = orderScanTable }}/>
  }

}