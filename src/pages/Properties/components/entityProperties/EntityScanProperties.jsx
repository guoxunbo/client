
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import EntityProperties from './EntityProperties';
import { Notification } from '../../../../components/notice/Notice';
import I18NUtils from '../../../../api/utils/I18NUtils';
import { i18NCode } from '../../../../api/const/i18n';

/**
 * 默认显示数据，支持扫描查询条件，将扫描到的数据添加到表格中
 * 这里面的buildTable方法返回的对象必须继承EntityListTable 只支持一个查询条件
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
        loading: false,
        resetFlag: true
      });
    }

    queryNodeFocus = () => {
      if (this.form.state.queryFields[0]) {
        this.form.state.queryFields[0].node.focus();
      }
    }

    /**
     * 焦点全部失焦
     */
    allFieldBlur = () => {
      let queryFields = this.form.state.queryFields;
      // 全部失焦
      queryFields.forEach(queryField => {
        if (queryField.node) {
          queryField.node.blur();
        }
      });
    }

    showDataNotFound = () => {
      // 如果只有一个条件，则提示具体条件
      let queryFields = this.form.state.queryFields;
      let data = this.form.props.form.getFieldValue(queryFields[0].name);
      this.setState({ 
        loading: false
      });
      this.allFieldBlur();
      Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (data || ""));
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
                // 最新扫描则放在第一个
                tableData.unshift(data);
              }
            });
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          } else {
            self.showDataNotFound();
          }
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }
    
}
