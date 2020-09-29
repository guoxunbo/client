import EntityDoubleScanProperties from "./entityProperties/EntityDoubleScanProperties";
import { List } from "antd";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";
import WltPackCaseCheckTable from "../../../components/Table/gc/WltPackCaseCheckTable";

/**
 * GC LOT装箱检验
 * 记录在物料批次上一个属性栏位即可。
 */
export default class WltPackCaseCheckProperties extends EntityDoubleScanProperties{

    static displayName = 'WltPackCaseCheckProperties';
      
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
                judgeWltPackCaseItemList: responseBody.judgeWltPackCaseItemList
              });
            }
        }
        MaterialLotManagerRequest.sendGetWltJudgePackCaseItemListRequest(requestCheckDataObject);
    }

    queryData = (whereClause) => {
      const self = this;
      let reloadTableData = false;
      let firstQueryField = self.form.state.queryFields[0];
      if (whereClause.indexOf(firstQueryField.name) != -1) {
          reloadTableData = true;
          let queryFields = this.form.state.queryFields;
          let queryLotId = this.form.props.form.getFieldValue(queryFields[0].name)
          let requestObject = {
            tableRrn: this.state.tableRrn,
            queryLotId: queryLotId,
            success: function(responseBody) {
              let queryDatas = responseBody.materialLotList;
                if (queryDatas && queryDatas.length > 0) {
                    self.setState({ 
                      tableData: queryDatas,
                      loading: false,
                      scanErrorFlag: false,
                      resetFlag:true,
                    });
                    self.nextQueryNodeFocus();
                    self.form.resetFormFileds();
                } else {
                  self.showDataNotFound(reloadTableData);
                  self.resetData();
                }
            }
          }
          MaterialLotManagerRequest.sendQueryMLotRequest(requestObject);
      } else {
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
              if (queryDatas && queryDatas.length > 0) {
                self.afterSecondQuery(queryDatas);
              } else {
                self.showDataNotFound(reloadTableData);
              }
            }
          }
          TableManagerRequest.sendGetDataByRrnRequest(requestObject);
        }
      }

    buildTable = () => {
        return <WltPackCaseCheckTable checkItemList={this.state.judgeWltPackCaseItemList} pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    scanErrorFlag={this.state.scanErrorFlag}/>
    }

    buildOtherComponent = () => {
        return <List bordered header={<div>{I18NUtils.getClientMessage(i18NCode.CheckItemList)}</div>}
                      dataSource={this.state.judgeWltPackCaseItemList}
                      renderItem={item => <List.Item>{item.value}</List.Item>}></List>
    }
}