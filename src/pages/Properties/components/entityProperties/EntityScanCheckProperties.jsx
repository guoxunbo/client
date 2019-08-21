
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import EntityProperties from './EntityProperties';
import { Notification } from '../../../../components/notice/Notice';
import I18NUtils from '../../../../api/utils/I18NUtils';
import { i18NCode } from '../../../../api/const/i18n';

/**
 * 默认显示数据，支持扫描查询条件回车事件，将扫描进行查找的数据打钩
 * 这里面的buildTable方法返回的对象必须继承EntityListCheckTable
 */
export default class EntityScanCheckProperties extends EntityProperties {
  
    static displayName = 'EntityScanCheckProperties';

    queryData = (whereClause) => {
      const self = this;
      let {rowKey, selectedRowKeys, selectedRows} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          if (queryDatas && queryDatas.length > 0) {
            queryDatas.forEach(data => {
              if (selectedRowKeys.indexOf(data[rowKey]) < 0) {
                selectedRowKeys.push(data[rowKey]);
                selectedRows.push(data);
              }
            });
            self.setState({ 
              selectedRowKeys: selectedRowKeys,
              selectedRows: selectedRows,
              loading: false
            });
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
