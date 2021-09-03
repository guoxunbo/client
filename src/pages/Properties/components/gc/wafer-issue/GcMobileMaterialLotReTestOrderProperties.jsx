import MobileProperties from "../../mobile/MobileProperties";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import EventUtils from '../../../../../api/utils/EventUtils';
import MobileMaterialLotReTestOrderTable from "../../../../../components/Table/gc/MobileMaterialLotReTestOrderTable";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import RetestManagerRequest from "../../../../../api/gc/retest-manager/RetestManagerRequest";
import moment from "moment";

export default class GcMobileMaterialLotReTestOrderProperties extends MobileProperties{

    static displayName = 'GcMobileMaterialLotReTestOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
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
              if(data.errorFlag){
                errorData.unshift(data);
              } else if(trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
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
      
      let materialLots = self.orderTable.state.data;
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
      RetestManagerRequest.sendMobileRetestRequest(requestObject);
    }

    buildTable = () => {
        return <MobileMaterialLotReTestOrderTable 
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