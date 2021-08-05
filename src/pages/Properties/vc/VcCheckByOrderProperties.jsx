import IssueOrderRequest from "@api/issue-order-manager/issue-lot-order/IssueOrderRequest";
import EntityProperties from "../framework/EntityProperties";
import VcCheckByOrderScanProperties from "./VcCheckByOrderScanProperties";

/**
 * ERP盘点
 */
export default class VcCheckByOrderProperties extends EntityProperties{

      static display = 'VcCheckByOrderProperties';

      afterSelectRow = (entityTable, record, rowKey) => {
            entityTable.setState({loading: false});
            if(!record || record == undefined){
                  return ;
            }
            let self = this;
            let object = {
                  documentId: record.name,
                  success: function(responseBody) {
                      let showData = responseBody.materialLotList;      
                      self.scanProperties.setState({tableData: showData})
                  }
              }
            IssueOrderRequest.sendGetWaitMLotByOrderRequest(object);
      }

      buildOtherComponent = () => {
         return <VcCheckByOrderScanProperties 
                  {...this.getDefaultTableProps()}
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  ref={(scanProperties) => { this.scanProperties = scanProperties}}/>
      }
}