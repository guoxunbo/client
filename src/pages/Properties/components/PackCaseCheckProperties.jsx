import EntityScanProperties from "./entityProperties/EntityScanProperties";
import PackCaseCheckTable from "../../../components/Table/gc/PackCaseCheckTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Notification } from "../../../components/notice/Notice";

/**
 * GC 装箱检验
 * 记录在物料批次上一个属性栏位即可。
 */
export default class PackCaseCheckProperties extends EntityScanProperties{

    static displayName = 'PackCaseCheckProperties';
      
    buildTable = () => {
        return <PackCaseCheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

    queryData = (whereClause) => {
        const self = this;
        let reloadTableData = false;
        // 如果是根据包装箱号查询，则直接进行查询表格数据
        if (whereClause.indexOf("parentMaterialLotId") != -1) {
            reloadTableData = true;
        }
        let {rowKey,tableData} = this.state;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (reloadTableData) {
                if (queryDatas && queryDatas.length > 0) {
                    self.setState({ 
                      tableData: queryDatas,
                      loading: false
                    });
                    self.form.state.queryFields[1].node.focus();
                    self.form.resetFormFileds();
                } else {
                    self.showDataNotFound();
                }
            } else {
                // 扫描表格数据，判断是否包含此数据，查找数据，只会返回一笔，查找第一笔即可
                if (queryDatas && queryDatas.length > 0) {
                    let dataIndex = -1;
                    tableData.map((d, index) => {
                        if (d[rowKey] === queryDatas[0][rowKey]) {
                            dataIndex = index;
                        }
                    });
                    if (dataIndex > -1) {
                        queryDatas[0].scaned = true;
                        tableData.splice(dataIndex, 1, queryDatas[0]);
                        self.setState({ 
                            tableData: tableData,
                            loading: false
                        });
                    } else {
                        self.showDataNotFound();
                    }
                    self.form.state.queryFields[1].node.focus();
                    self.form.resetFormFileds();
                } else {
                    self.showDataNotFound();
                }
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
      }
}