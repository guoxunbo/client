import MobileProperties from "../../mobile/MobileProperties";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MobileRawMaterialIssueMLotScanTable from "../../../../../components/Table/gc/MobileRawMaterialIssueMLotScanTable";
import GCRawMaterialImportRequest from "../../../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import moment from "moment";
import EventUtils from '../../../../../api/utils/EventUtils';

export default class GcMobileRawMaterialIssueMLotScanProperties extends MobileProperties{

    static displayName = 'GcMobileRawMaterialIssueMLotScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
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
            let data = undefined;
            if (queryDatas && queryDatas.length > 0) {
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
              queryDatas.forEach(data => {
                if(trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
              let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = materialLotId;
              data.setMaterialLotId(materialLotId);
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
        GCRawMaterialImportRequest.sendGetDataByLotIdAndTableRrnRequest(requestObject);
    }

    handleSubmit = () => {
      let self = this;
      let erpTime = self.orderTable.erpTime.picker.state.showDate;
      if(moment.isMoment(erpTime)){
        erpTime = erpTime.format("YYYY-MM-DD");
      }

      if (erpTime == "" || erpTime == null || erpTime == undefined) {
          Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectERPTime));
          return;
      }

      if (self.orderTable.getErrorCount() > 0) {
          Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
          return;
      }

      let materialLots = self.state.tableData;
      if (materialLots.length === 0) {
          Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
          return;
      }

      self.setState({
          loading: true
      });
      EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

      let requestObject = {
          materialLots : materialLots,
          erpTime : erpTime,
          success: function(responseBody) {
                self.resetData();
              MessageUtils.showOperationSuccess();
          }
      }
      GCRawMaterialImportRequest.sendMobileRawMaterialIssueRequest(requestObject);
    }



    buildTable = () => {
        return <MobileRawMaterialIssueMLotScanTable 
                                        ref={(orderTable) => { this.orderTable = orderTable }} 
                                        pagination={false} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}
                                        />
    }

}