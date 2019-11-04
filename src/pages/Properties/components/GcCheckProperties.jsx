import EntityScanProperties from "./entityProperties/EntityScanProperties";
import CheckTable from "../../../components/Table/gc/CheckTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import uuid from 'react-native-uuid';
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";

/**
 * GC 盘点
 *  当数据不存在的时候，直接添加一笔数据
 */
export default class GcCheckProperties extends EntityScanProperties{

    static displayName = 'GcOrderProperties';
    
    queryData = (whereClause) => {
      debugger;
        const self = this;
        let {rowKey,tableData} = this.state;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              queryDatas.forEach(data => {
                if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  tableData.unshift(data);
                } else {
                  self.showDataAlreadyExists();
                }
              });
              self.setState({ 
                tableData: tableData,
                loading: false
              });
              self.form.resetFormFileds();
            } else {
                let record = self.form.props.form.getFieldsValue();
                record[self.state.rowKey] = uuid.v1();
                record.errorFlag = true;
                if (tableData.filter((d) => d.materialLotId === record.materialLotId).length === 0) {
                    tableData.unshift(record);
                } else {
                  self.showDataAlreadyExists();
                }
                self.setState({ 
                    tableData: tableData,
                    loading: false
                });
                self.form.resetFormFileds();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    showDataAlreadyExists = () => {
      // 如果只有一个条件，则提示具体条件
      const self = this;
      let queryFields = this.form.state.queryFields;
      let data = this.form.props.form.getFieldValue(queryFields[0].name);
      this.setState({ 
        loading: false
      });
      this.allFieldBlur();
      Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataAlreadyExists) + (data || ""));
      self.form.resetFormFileds();
      this.form.state.queryFields[0].node.focus();
    }

    buildTable = () => {
        return <CheckTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}