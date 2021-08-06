import ReturnOrderScanProperties from "./ReturnOrderScanProperties";
import ReturnMLotOrderProperties from "./ReturnMLotOrderProperties";
import ReturnOrderTable from "@components/mms/table/ReturnOrderTable";

/**
 * 仓库退到供应商
 */
export default class ReturnOrderProperties extends ReturnMLotOrderProperties{

    static displayName = 'ReturnOrderProperties';

    buildTable = () => {
      return <ReturnOrderTable
              {...this.getDefaultTableProps()}
              scrollY={200} 
              pagination={false} 
              ref={(orderTable) => { this.orderTable = orderTable }}                   
              orderScanTable = {this.orderScanTable}
              resetData = {this.resetData}/>
  }

    buildOtherComponent = () => {
      return <ReturnOrderScanProperties
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(orderScanTable) => { this.orderScanTable = orderScanTable }}/>
  }

}