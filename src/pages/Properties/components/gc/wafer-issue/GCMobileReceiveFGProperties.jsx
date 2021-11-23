import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MobileMLotMesStockInTable from "../../../../../components/Table/gc/MobileMLotMesStockInTable";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import FinishGoodInvManagerRequest from "../../../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest";

export default class GCMobileReceiveFGProperties extends MobileProperties{

    static displayName = 'GcCOMWaferIssueMLotUnitScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "packedLotRrn"};
    }

    queryData = (whereClause) => {
      const self = this;
      const {rowKey} = this.state;
      let tableData = this.state.tableData;
      let queryFields = this.form.state.queryFields;
      let materialLotId = this.form.props.form.getFieldValue(queryFields[0].name);
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          if (queryDatas && queryDatas.length > 0) {
              let errorData = [];
              let trueData = [];
              tableData.forEach(data =>{
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
              });
              tableData = [];
              queryDatas.forEach(data => {
                if (trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
              let data = new MaterialLot();
              data[rowKey] = materialLotId;
              data.boxId = materialLotId;
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
      const {tableData} = this.state;
      let self = this;
      if (!tableData || tableData.length == 0) {
          Notification.showError(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
          return;
      }

      if (this.dataTable.getErrorCount() > 0) {
        Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
        return;
      }
      let materialLots = tableData;
      if (materialLots && materialLots.length > 0) {
          let requestObject = {
              mesPackedLots: materialLots,
              success: function(responseBody) {
                  self.handleReset();
                  MessageUtils.showOperationSuccess();
              }
          }
          FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
      }
    }
    
    buildTable = () => {
        return <MobileMLotMesStockInTable ref={(dataTable) => { this.dataTable = dataTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }
}