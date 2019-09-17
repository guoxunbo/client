import PackCaseCheckTable from "../../../components/Table/gc/PackCaseCheckTable";
import EntityDoubleScanProperties from "./entityProperties/EntityDoubleScanProperties";
import { List } from "antd";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";

/**
 * GC 装箱检验
 * 记录在物料批次上一个属性栏位即可。
 */
export default class PackCaseCheckProperties extends EntityDoubleScanProperties{

    static displayName = 'PackCaseCheckProperties';
      
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
                judgePackCaseItemList: responseBody.judgePackCaseItemList
              });
            }
        }
        MaterialLotManagerRequest.sendGetJudgePackCaseItemListRequest(requestCheckDataObject);
    }

    buildTable = () => {
        return <PackCaseCheckTable checkItemList={this.state.judgePackCaseItemList} pagination={false} 
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
                      dataSource={this.state.judgePackCaseItemList}
                      renderItem={item => <List.Item>{item.value}</List.Item>}></List>
    }
}