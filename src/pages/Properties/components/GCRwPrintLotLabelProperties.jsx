import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcRwPrintLotLabelTable from "../../../components/Table/gc/GcRwPrintLotLabelTable";

export default class GCRwPrintLotLabelProperties extends EntityScanProperties{

    static displayName = 'GCRwPrintLotLabelProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state}
    }

    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
        loading: false,
        resetFlag: true
      });
    }
    
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let materialLotList = responseBody.dataList;
            if(materialLotList.length > 0){
              self.setState({
                tableData: responseBody.dataList,
                loading: false
              });
            } else {
              self.showDataNotFound();
            }
            self.form.resetFormFileds();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
      }

    buildTable = () => {
        return <GcRwPrintLotLabelTable pagination={false} rowKey={this.state.rowKey} 
                                        selectedRowKeys={this.state.selectedRowKeys} 
                                        selectedRows={this.state.selectedRows} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}/>
    }

}