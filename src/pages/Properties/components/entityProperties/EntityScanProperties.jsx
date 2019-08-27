
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import EntityProperties from './EntityProperties';
import { Notification } from '../../../../components/notice/Notice';
import I18NUtils from '../../../../api/utils/I18NUtils';
import { i18NCode } from '../../../../api/const/i18n';

/**
 * 默认显示数据，支持扫描查询条件，将扫描到的数据添加到表格中
 * 这里面的buildTable方法返回的对象必须继承EntityListTable
 */
export default class EntityScanProperties extends EntityProperties {
  
    static displayName = 'EntityScanCheckProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{searchTxt: I18NUtils.getClientMessage(i18NCode.BtnAdd)}};
    }
    /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
    resetData = () => {
      this.setState({
        selectedRowKeys: [],
        selectedRows: [],
        tableData: [],
      });
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
            queryDatas.forEach(data => {
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.push(data);
              }
            });
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          } else {
            self.setState({ 
              loading: false
            });
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound));
          }
        
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }
    
}
