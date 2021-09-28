import VcCheckByOrderTable from "@components/vc/table/VcCheckByOrderTable";
import VcScrapByOrderTable from "@components/vc/table/VcScrapByOrderTable";
import EntityProperties from "../framework/EntityProperties";
import VcScrapByOrderScanProperties from "./VcScrapByOrderScanProperties";

/**
 * 根据单据报废
 */
export default class VcScrapByOrderProperties extends EntityProperties{

      static display = 'VcScrapByOrderProperties';

      resetData = () => {
            this.setState({
                selectedRowKeys: [],
                selectedRows: [],
                tableData: [],
                loading: false,
                resetFlag: true
            });
            this.scanProperties.resetData();
      }

      buildGetDate= () =>{
            this.handleSearch(this.state.whereClause)
      }

      buildTable = () => {
            return <VcScrapByOrderTable 
                {...this.getDefaultTableProps()}
                pagination={false} 
                scrollY={200} 
                scanProperties = {this.scanProperties}
                ref={(orderTable) => {this.orderTable = orderTable}}/>
      }

      buildOtherComponent = () => {
            return <VcScrapByOrderScanProperties
                {...this.getDefaultTableProps()}
                tableRrn = {this.state.parameters.parameter1}  
                orderTable = {this.orderTable} 
                resetData = {this.resetData.bind(this)}
                onSearch={this.buildGetDate.bind(this)}
                ref={(scanProperties) => { this.scanProperties = scanProperties}}/>
      }
}