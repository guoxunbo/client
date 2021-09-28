import VcCheckByOrderTable from "@components/vc/table/VcCheckByOrderTable";
import EntityProperties from "../framework/EntityProperties";
import VcCheckByOrderScanProperties from "./VcCheckByOrderScanProperties";

/**
 * 根据单据盘点
 */
export default class VcCheckByOrderProperties extends EntityProperties{

      static display = 'VcCheckByOrderProperties';

      buildTable = () => {
            return <VcCheckByOrderTable {...this.getDefaultTableProps()}
            scanProperties = {this.scanProperties}
            pagination={false} 
            scrollY={200} 
            ref={(orderTable) => {this.orderTable = orderTable}}/>
      }

      buildGetDate= () =>{
            this.handleSearch(this.state.whereClause)
      }
      
      buildOtherComponent = () => {
            return <VcCheckByOrderScanProperties 
                  {...this.getDefaultTableProps()}
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  ref={(scanProperties) => { this.scanProperties = scanProperties}}
                  onSearch={this.buildGetDate.bind(this)}/>
      }
}