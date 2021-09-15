import EntityDoubleScanProperties from "./entityProperties/EntityDoubleScanProperties";
import { List } from "antd";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";
import WltPackCaseCheckTable from "../../../components/Table/gc/WltPackCaseCheckTable";
import StockInManagerRequest from "../../../api/gc/stock-in/StockInManagerRequest";
import { Notification } from "../../../components/notice/Notice";

/**
 * GC LOT装箱检验
 * 记录在物料批次上一个属性栏位即可。
 */
export default class WltLotPackCaseCheckProperties extends EntityDoubleScanProperties{

    static displayName = 'WltLotPackCaseCheckProperties';

    queryData = (whereClause) => {
      const self = this;
      let tableData = self.state.tableData;
      let reloadTableData = false;
      let firstQueryField = self.form.state.queryFields[0];
     
      let queryFields = this.form.state.queryFields;
      let data = "";
      
      // 如果查询条件中包含了第一个的查询条件，则进行重新查找
      if (whereClause.indexOf(firstQueryField.name) != -1) {
          data = this.form.props.form.getFieldValue(queryFields[0].name);
          reloadTableData = true;
      }
      if (!reloadTableData){
        let lotIdData = this.form.props.form.getFieldValue(queryFields[1].name);
        self.afterSecondQuery(lotIdData);
        self.form.resetFormFileds();
      } else {
        let requestObject = {
          tableRrn: this.state.tableRrn,
          lotId: data,
          success: function(responseBody) {
            let materialLot = responseBody.materialLot;
            if (reloadTableData) {
              if (materialLot) {
                  tableData = [];
                  tableData.push(materialLot);
                  self.setState({
                    tableData: tableData,
                    loading: false,
                    scanErrorFlag: false,
                    resetFlag: true,
                    selectedRowKeys: [],
                    selectedRows: [],
                  });
                  self.nextQueryNodeFocus();
                  self.form.resetFormFileds();
              }
            } 
          },
          fail: function() {
            self.setState({ 
                tableData: tableData,
                selectedRowKeys: [],
                selectedRows: [],
                loading: false
            });
            self.form.resetFormFileds();
          }
        }
        StockInManagerRequest.sendQueryWaferRequest(requestObject);
      }
    }

    /**
         * 第二个条件查询之后，检索表格数据中是否含有该数据，如果没有，则提示。有则标志为scanned
         */
    afterSecondQuery = (lotId) => {
      let {rowKey,tableData, selectedRowKeys, selectedRows} = this.state;
      if (lotId != "" && lotId != undefined && lotId != null) {
        let dataIndex = -1;
        let queryData = undefined;
        tableData.map((d, index) => {
            if (d.lotId === lotId) {
                dataIndex = index;
            }
        });
        if (dataIndex > -1) {
            queryData = tableData[dataIndex];
            queryData.scaned = true;
            tableData.splice(dataIndex, 1, queryData);
            if (selectedRowKeys.indexOf(queryData[rowKey]) < 0) {
              selectedRowKeys.push(queryData[rowKey]);
              selectedRows.push(queryData);
            }
            this.setState({ 
              selectedRowKeys: selectedRowKeys,
              selectedRows: selectedRows,
              tableData: tableData,
              resetFlag:false,
              loading: false
            });
            this.nextQueryNodeFocus();
            this.form.resetFormFileds();
        } else {
          this.setState({ 
            loading: false
          });    
          Notification.showInfo(I18NUtils.getClientMessage(i18NCode.InconsistentScanningInformation) + (lotId || ""));
        }
      } else {
        this.showDataNotFound();
      }
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
                judgeWltPackCaseItemList: responseBody.judgeWltPackCaseItemList
              });
            }
        }
        MaterialLotManagerRequest.sendGetWltJudgePackCaseItemListRequest(requestCheckDataObject);
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