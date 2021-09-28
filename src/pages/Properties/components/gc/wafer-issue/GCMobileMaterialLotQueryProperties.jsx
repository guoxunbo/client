import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MaterialLotQueryTable from "../../../../../components/Table/gc/MaterialLotQueryTable";
import MaterialLotManagerRequest from "../../../../../api/gc/material-lot-manager/MaterialLotManagerRequest";

export default class GCMobileMaterialLotQueryProperties extends MobileProperties{

    static displayName = 'GCMobileMaterialLotQueryProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    queryData = () => {
      const self = this;
      let {rowKey,tableData} = this.state;
      let queryFields = this.form.state.queryFields;
      let queryLotId = this.form.props.form.getFieldValue(queryFields[0].name);
      if(queryLotId == "" || queryLotId == null || queryLotId == undefined){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty));
        self.setState({ 
          tableData: tableData,
          loading: false,
        });
        return;
      }
      let requestObject = {
        tableRrn: this.state.tableRrn,
        queryLotId: queryLotId,
        success: function(responseBody) {
          let queryDatas = responseBody.materialLotList;
          if (queryDatas && queryDatas.length > 0) {
            queryDatas.forEach(data => {
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
        
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          self.form.resetFormFileds();
        }
      }
      MaterialLotManagerRequest.sendGetDataByLotIdOrMLotAndTableRrnRequest(requestObject);
  }

  showDataNotFound = () => {
    let queryFields = this.form.state.queryFields;
    let data = this.form.props.form.getFieldValue(queryFields[0].name);
    this.setState({ 
      loading: false
    });
    this.allFieldBlur();
    Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (data || ""));
  }
    
  buildTable = () => {
    return <MaterialLotQueryTable pagination={false} 
                                rowKey={this.state.rowKey} 
                                selectedRowKeys={this.state.selectedRowKeys} 
                                selectedRows={this.state.selectedRows} 
                                table={this.state.table} 
                                data={this.state.tableData} 
                                loading={this.state.loading} 
                                resetData={this.resetData.bind(this)}/>
  }

}