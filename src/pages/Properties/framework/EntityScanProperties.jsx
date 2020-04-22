
import EntityProperties from '@properties/framework/EntityProperties';
import NoticeUtils from '@utils/NoticeUtils';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';

/**
 * 默认显示数据，支持扫描查询条件，将扫描到的数据添加到表格中
 * 这里面的buildTable方法返回的对象必须继承EntityListTable 只支持一个查询条件
 */
export default class EntityScanProperties extends EntityProperties {
  
    static displayName = 'EntityScanCheckProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{scanAddFlag:true, searchTxt: I18NUtils.getClientMessage(i18NCode.BtnAdd)}};
    }

    getDefaultTableProps = () => {
      return {
        rowKey: this.state.rowKey,
        selectedRowKeys: this.state.selectedRowKeys,
        selectedRows: this.state.selectedRows,
        data: this.state.tableData,
        tableRrn: this.state.tableRrn,
        loading: this.state.loading,
        scanAddFlag: this.state.scanAddFlag,
        selectedRowKeys: this.state.selectedRowKeys,
        selectedRows: this.state.selectedRows,
        resetData: this.resetData.bind(this),
        resetFlag: this.state.resetFlag
      }
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
      NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (data || ""));
    }

    afterQuery = (responseBody) => {
      let {rowKey,tableData} = this.state;
      let queryDatas = responseBody.dataList;
      if (queryDatas && queryDatas.length > 0) {
        queryDatas.forEach(data => {
          if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
            // 最新扫描则放在第一个
            tableData.unshift(data);
          }
        });
        this.setState({ 
          tableData: tableData,
          loading: false
        });
        this.form.resetFormFileds();
      } else {
        this.showDataNotFound();
      }
    }
    
}
