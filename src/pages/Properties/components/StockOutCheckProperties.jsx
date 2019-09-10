import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockOutCheckTable from "../../../components/Table/gc/StockOutCheckTable";
import EntityProperties from "./entityProperties/EntityProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import { List } from "antd";
import StockOutCheckRequest from "../../../api/gc/stock-out-check/StockOutCheckRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";

/**
 * GC 出货前检验
 */
export default class StockOutCheckProperties extends EntityProperties{

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
          self.form.resetFormFileds();
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
      return <StockOutCheckTable pagination={false} 
                                  rowKey={this.state.rowKey} 
                                  selectedRowKeys={this.state.selectedRowKeys} 
                                  selectedRows={this.state.selectedRows} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}/>
    }

    buildOtherComponent = () => {
      return <List  bordered
      header={<div>{I18NUtils.getClientMessage(i18NCode.CheckItemList)}</div>}
                    dataSource={this.state.stockOutCheckList}
                    renderItem={item => <List.Item>{item.name}</List.Item>}></List>
    }
}