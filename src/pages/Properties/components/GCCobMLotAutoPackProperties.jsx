import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCCobMLotAutoPackTable from "../../../components/Table/gc/GCCobMLotAutoPackTable";

export default class GCCobMLotAutoPackProperties  extends EntityScanProperties {

    static displayName = 'GCCobMLotAutoPackProperties';

    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = self.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let dataList = responseBody.dataList;
          if(dataList && dataList.length > 0){
            let materialLot = dataList[0];
            if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
              tableData.unshift(materialLot);
            }
          }
          self.form.resetFormFileds();
          self.setState({
            tableData: tableData,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GCCobMLotAutoPackTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}