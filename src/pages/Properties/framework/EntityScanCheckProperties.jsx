
import EntityProperties from '@properties/framework/EntityProperties';
import NoticeUtils from '@utils/NoticeUtils';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';

/**
 * 默认显示数据，支持扫描查询条件回车事件，将扫描进行查找的数据打钩
 * 这里面的buildTable方法返回的对象必须继承EntityListCheckTable
 */
export default class EntityScanCheckProperties extends EntityProperties {
  
    static displayName = 'EntityScanCheckProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{searchTxt: I18NUtils.getClientMessage(i18NCode.BtnCheck)}};
    }

    showDataNotFound = () => {
      this.setState({ 
        loading: false
      });
      NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
    }

    /**
     * 当表格里按钮对选中的数据做完操作之后，
     * 务必调用下此方法把扫描添加进去的state数据清零。不然会吧上一次的扫描结果一起带到下一次中去
     */
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          resetFlag: true,
        });
    }

    afterQuery = (responseBody) => {
      let {rowKey, selectedRowKeys, selectedRows} = this.state;
      let queryDatas = responseBody.dataList;
      if (queryDatas && queryDatas.length > 0) {
        queryDatas.forEach(data => {
          if (selectedRowKeys.indexOf(data[rowKey]) < 0) {
            selectedRowKeys.push(data[rowKey]);
            selectedRows.push(data);
          }
        });
        this.setState({ 
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows,
          resetFlag:false,
          loading: false
        });
        this.form.resetFormFileds();
      } else {
        this.showDataNotFound();
      }
    }
    
}
