import EntityScanProperties from "@properties/framework/EntityScanProperties";
import StockOutCheckTable from "@components/Table/gc/StockOutCheckTable";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import { List } from "antd";
import StockOutCheckRequest from "@api/gc/stock-out-check/StockOutCheckRequest";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";

/**
 * GC 出货前检验
 */
export default class StockOutCheckProperties extends EntityScanProperties{

    static displayName = 'StockOutCheckProperties';
      
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
            stockOutCheckList: responseBody.stockOutCheckList
          });
        }
      }
      StockOutCheckRequest.sendGetCheckDataRequest(requestCheckDataObject);
    }

    buildTable = () => {
      return <StockOutCheckTable checkItemList={this.state.stockOutCheckList}
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
                    dataSource={this.state.stockOutCheckList}
                    renderItem={item => <List.Item>{item.value}</List.Item>}></List>
    }
}