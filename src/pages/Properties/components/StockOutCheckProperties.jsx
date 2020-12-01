import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockOutCheckTable from "../../../components/Table/gc/StockOutCheckTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import { List } from "antd";
import StockOutCheckRequest from "../../../api/gc/stock-out-check/StockOutCheckRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Notification } from "../../../components/notice/Notice";

/**
 * GC 出货前检验
 */
export default class StockOutCheckProperties extends EntityScanProperties{

    static displayName = 'StockOutCheckProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{currentHandleMLot: ""}};
    }
      
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

    handleSearch = () => {
      const self = this;
      let {rowKey,tableData, currentHandleMLot} = this.state;
      let queryFields = this.form.state.queryFields;
      let data = this.form.props.form.getFieldValue(queryFields[0].name);
      if(data == undefined || data == "" || data == null){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty));
        self.setState({ 
          tableData: tableData,
          loading: false,
        });
        return;
      }
      if(self.stockOutCheckTable.getErrorCount() > 0){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.ExpressNumberAndMLotMismatch));
        self.setState({ 
          tableData: tableData,
          loading: false,
          currentHandleMLot: "",
        });
        return;
      }
      let checkExpressFlag = this.stockOutCheckTable.state.value;
      if(currentHandleMLot && checkExpressFlag == "check"){
        tableData.forEach(materialLot => {
          if(materialLot[rowKey] == currentHandleMLot[rowKey]){
            if(materialLot.expressNumber == data){
              materialLot.trueFlag = true;
            } else{
              materialLot.errorFlag = true;
            }
          }
        });
        self.setState({ 
          tableData: tableData,
          loading: false,
          currentHandleMLot: ""
        });
        self.form.resetFormFileds();
      } else {
        let requestObject = {
            tableRrn: this.state.tableRrn,
            queryMLotId: data,
            success: function(responseBody) {
              let materialLot = responseBody.materialLot;
              if (materialLot) {
                if(checkExpressFlag == "check"){
                  if(materialLot.expressNumber == "" || materialLot.expressNumber == null || materialLot.expressNumber == undefined){
                    if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                      materialLot.errorFlag = true;
                      tableData.unshift(materialLot);
                    }
                  } else {
                    if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                      tableData.unshift(materialLot);
                      currentHandleMLot = materialLot;
                    }
                  }
                } 

                self.setState({ 
                  tableData: tableData,
                  loading: false,
                  currentHandleMLot: currentHandleMLot
                });
                self.form.resetFormFileds();
              } else {
                self.showDataNotFound();
              }
            }
          }
        StockOutCheckRequest.sendGetDataByRrnRequest(requestObject);
      }
    }

    buildTable = () => {
      return <StockOutCheckTable  ref={(stockOutCheckTable) => { this.stockOutCheckTable = stockOutCheckTable }}
                                  checkItemList={this.state.stockOutCheckList}
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