import QualityCheckProperties from "@properties/mms/QualityCheckProperties";
import OQCCheckTable from "@components/mms/table/OQCCheckTable";

/**
 * OQC检
 */
export default class OQCCheckProperties extends QualityCheckProperties{

    static displayName = 'OQCCheckProperties';
    
    buildTable = () => {
      let checkItemList= [];
      if (this.refList) {
        checkItemList = this.refList.state.dataList;
      }
      return <OQCCheckTable checkItemList={checkItemList}
                                  pagination={false} 
                                  rowKey={this.state.rowKey} 
                                  selectedRowKeys={this.state.selectedRowKeys} 
                                  selectedRows={this.state.selectedRows} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}/>
    }
    
}