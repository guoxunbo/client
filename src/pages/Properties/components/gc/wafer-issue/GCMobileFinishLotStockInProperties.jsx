import MobileProperties from "../../mobile/MobileProperties";
import MobileFGLotStockInTable from "../../../../../components/Table/gc/MobileFGLotStockInTable";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import FinishGoodInvManagerRequest from "../../../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest";
import MessageUtils from "../../../../../api/utils/MessageUtils";

export default class GCMobileFinishLotStockInProperties extends MobileProperties{

    static displayName = 'GCMobileFinishLotStockInProperties';
    
    constructor(props) {
      super(props);
      this.state = {...this.state, rowKey: "packedLotRrn"};
    }

    queryData = (whereClause) => {
      const self = this;
      let cstId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          let data = undefined;

          if (queryDatas && queryDatas.length > 0) {
          //GC要求扫描错误的放到最上面显示，扫描正确的显示在错误信息的下方
            let errorData = [];
            let trueData = [];
            tableData.forEach(data => {
              if(data.errorFlag){
                errorData.push(data);
              } else {
                trueData.push(data);
              }
            });
            tableData = [];
            let scanSeq = 0;
            if(trueData.length > 0){
              let cstIdList = [];
              trueData.forEach(data => {
                if (cstIdList.indexOf(data.cstId) == -1) {
                    cstIdList.push(data.cstId);
                    scanSeq = scanSeq + 1;
                }
            });
            }
            queryDatas.forEach(data => {
              if (trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                data.scanSeq = scanSeq + 1;
                trueData.unshift(data);
              }
            });
            errorData.forEach(data => {
              tableData.push(data);
            });
            trueData.forEach(data => {
              tableData.push(data);
            });
          } else {
            data = new MaterialLot();
            data[rowKey] = cstId;
            data.cstId = cstId;
            data.errorFlag = true;
            if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
              tableData.unshift(data);
            }
          }
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          self.form.resetFormFileds();
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    handleSubmit = () => {
      debugger;
      const {tableData} = this.state;
      let self = this;
      if (!tableData || tableData.length == 0) {
          Notification.showError(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
          return;
      }

      if (self.orderTable.getErrorCount() > 0) {
        Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
        return;
      }
      let printLabelFlag = "printLabel";
      let printCount = 2;

      if (tableData && tableData.length > 0) {
        let requestObject = {
            mesPackedLots: tableData,
            printLabel: printLabelFlag,
            printCount: printCount,
            success: function(responseBody) {
              self.handleReset();
              MessageUtils.showOperationSuccess();
            }
        }
        FinishGoodInvManagerRequest.sendWLTReceiveRequest(requestObject);
      }
    }

    buildTable = () => {
        return <MobileFGLotStockInTable ref={(orderTable) => { this.orderTable = orderTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }


}