
import TableManagerRequest from '../../../../api/table-manager/TableManagerRequest';
import EntityScanProperties from './EntityScanProperties';
import I18NUtils from '../../../../api/utils/I18NUtils';
import { i18NCode } from '../../../../api/const/i18n';
import { Notification } from '../../../../components/notice/Notice';

/**
 * 默认不显示数据，支持双重扫描数据，即2个文本查找条件进行查找。
 *  根据第一个条件是查找数据库数据，第二个条件就是查找数据数据库以及判断是否在表格中。 有则标记成scanned
 *  
 */
export default class EntityDoubleScanProperties extends EntityScanProperties {
  
    static displayName = 'EntityDoubleScanProperties';
  
    nextQueryNodeFocus = () => {
      if (this.form.state.queryFields[1]) {
        this.form.state.queryFields[1].node.focus();
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

    showDataNotFound = (reloadFlag) => {
      this.setState({ 
        loading: false,
        scanErrorFlag: true,
      });

      let data;
      let queryFields = this.form.state.queryFields;
      if (reloadFlag) {
        data = this.form.props.form.getFieldValue(queryFields[0].name)
      } else {
        if (queryFields.length === 2) {
          data = this.form.props.form.getFieldValue(queryFields[1].name)
        }
      }
      this.allFieldBlur();
      Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (data || ""));
    }

    /**
     * 第二个条件查询之后，检索表格数据中是否含有该数据，如果没有，则提示。有则标志为scanned
     */
    afterSecondQuery = (queryDatas) => {
      let {rowKey,tableData, selectedRowKeys, selectedRows} = this.state;
      if (queryDatas && queryDatas.length > 0) {
        let queryData = queryDatas[0];
        let dataIndex = -1;
        tableData.map((d, index) => {
            if (d[rowKey] === queryData[rowKey]) {
                dataIndex = index;
            }
        });
        if (dataIndex > -1) {
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
          this.showDataNotFound();
        }
      } else {
        this.showDataNotFound();
      }
    }

    queryData = (whereClause) => {
      const self = this;
      let reloadTableData = false;
      let firstQueryField = self.form.state.queryFields[0];
      // 如果查询条件中包含了第一个的查询条件，则进行重新查找
      if (whereClause.indexOf(firstQueryField.name) != -1) {
          reloadTableData = true;
      }
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          if (reloadTableData) {
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
          } else {
            // 扫描表格数据，判断是否包含此数据，查找数据，只会返回一笔，查找第一笔即可
            self.afterSecondQuery(queryDatas);
          }
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }
}
