import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCSamsungOuterBoxLabelPrintTable from "../../../components/Table/gc/GCSamsungOuterBoxLabelPrintTable";

const PackageType = "GCRWBoxLabelPrintProperties";

/**
 * 三星外箱标签打印
 */
export default class GCSamsungOuterBoxLabelPrintProperties extends EntityScanProperties{

    static displayName = 'GCSamsungOuterBoxLabelPrintProperties';
      
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
      this.form.resetFormFileds();
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GCSamsungOuterBoxLabelPrintTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}