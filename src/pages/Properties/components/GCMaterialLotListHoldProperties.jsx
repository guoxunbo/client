import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import GCMaterialLotHoldTable from "../../../components/Table/gc/GCMaterialLotHoldTable";

export default class GCMaterialLotListHoldProperties  extends EntityScanProperties {

    static displayName = 'GCMaterialLotListHoldProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          if (queryDatas && queryDatas.length > 0) {
            queryDatas.forEach(materialLot => {
              if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                tableData.unshift(materialLot);
              }
            });
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          } else {
            self.showDataNotFound();
          }
        } 
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
  }

  buildTable = () => {
    return <GCMaterialLotHoldTable 
                                  pagination={false} 
                                  rowKey={this.state.rowKey} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}/>
  }
}