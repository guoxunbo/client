import MobileProperties from "../../mobile/MobileProperties";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import EventUtils from '../../../../../api/utils/EventUtils';
import MobileWaferIssueOutTable from "../../../../../components/Table/gc/MobileWaferIssueOutTable";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";

export default class GcMobileWaferIssueOutProperties extends MobileProperties{

    static displayName = 'GcMobileWaferIssueOutProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = this.state;
      let queryFields = this.form.state.queryFields;
      let data = this.form.props.form.getFieldValue(queryFields[0].name);
      if(whereClause == ''){
        Notification.showInfo(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty))
        self.setState({ 
          tableData: tableData,
          loading: false
        });
      } else if(tableData.length == 10){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.MaterialLotIssueQtyCannotMoreThanTen));
        self.setState({ 
          tableData: tableData,
          loading: false
        });
        self.form.resetFormFileds();
        return;
      } else {
        let requestObject = {
          tableRrn: this.state.tableRrn,
          lotId: data,
          success: function(responseBody) {
            let materialLot = responseBody.materialLot;
            if(materialLot && materialLot.materialLotId != null && materialLot.materialLotId != ""){
              let errorData = [];
              let trueData = [];
              tableData.forEach(data =>{
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
              });
              if (trueData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                trueData.unshift(materialLot);
              }
              tableData = [];
              errorData.forEach(data => {
                tableData.push(data);
              });
              trueData.forEach(data => {
                tableData.push(data);
              });
            } else {
              let errorData = new MaterialLot();
              errorData[rowKey] = data;
              errorData.setLotId(data);
              errorData.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === errorData[rowKey]).length === 0) {
                tableData.unshift(errorData);
              }
            }
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          }
        }
        WaferManagerRequest.sendMobileGetWaferRequest(requestObject);
      }
    }

    handleSubmit = () => {
      let self = this;
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
          success: function(responseBody) {
              self.resetData();
              MessageUtils.showOperationSuccess();
          }
      }
      WaferManagerRequest.sendWaferOutOrderIssueRequest(requestObject);
    }

    buildTable = () => {
        return <MobileWaferIssueOutTable
                                  pagination={false} 
                                  ref={(orderTable) => { this.orderTable = orderTable }} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}
                                  resetFlag={this.state.resetFlag}
                                  />
    }

}