import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCCobRetestLabelAndMakeUpTable from "../../../components/Table/gc/GCCobRetestLabelAndMakeUpTable";

export default class GCCobRetestLabelAndMakeUpProperties extends EntityScanProperties{

    static displayName = 'GCCobRetestLabelAndMakeUpProperties';

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
        return <GCCobRetestLabelAndMakeUpTable pagination={false} rowKey={this.state.rowKey} 
                                        selectedRowKeys={this.state.selectedRowKeys} 
                                        selectedRows={this.state.selectedRows} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}/>
    }

}