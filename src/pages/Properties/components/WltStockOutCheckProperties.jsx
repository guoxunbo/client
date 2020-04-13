import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockOutCheckTable from "../../../components/Table/gc/StockOutCheckTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import { List } from "antd";
import StockOutCheckRequest from "../../../api/gc/stock-out-check/StockOutCheckRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import WltStockOutCheckTable from "../../../components/Table/gc/WltStockOutCheckTable";

/**
 * GC Wlt出货前检验
 */
export default class WltStockOutCheckProperties extends EntityScanProperties{

    static displayName = 'WltStockOutCheckProperties';
      
    getTableData = () => {
      const self = this;
      let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
                table: responseBody.table,
                loading: false
            }); 
          }
      }
      TableManagerRequest.sendGetByRrnRequest(requestObject);

      let requestCheckDataObject = {
        success: function(responseBody) {
          self.setState({
            wltStockOutCheckList: responseBody.wltStockOutCheckList
          });
        }
      }
      StockOutCheckRequest.sendGetWltCheckDataRequest(requestCheckDataObject);
    }

    buildTable = () => {
      return <WltStockOutCheckTable checkItemList={this.state.wltStockOutCheckList}
                                  pagination={false} 
                                  rowKey={this.state.rowKey} 
                                  selectedRowKeys={this.state.selectedRowKeys} 
                                  selectedRows={this.state.selectedRows} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}/>
    }

    buildOtherComponent = () => {
      return <List  bordered header={<div>{I18NUtils.getClientMessage(i18NCode.CheckItemList)}</div>}
                    dataSource={this.state.wltStockOutCheckList}
                    renderItem={item => <List.Item>{item.value}</List.Item>}></List>
    }
}