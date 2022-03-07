import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import moment from "moment";
import MobileRawMaterialOtherShipTable from "../../../../../components/Table/gc/MobileRawMaterialOtherShipTable";
import GCRawMaterialImportRequest from "../../../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest";

export default class GCMobileRawMaterialOtherShipProperties extends MobileProperties{

    static displayName = 'GCMobileRawMaterialOtherShipProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
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
                self.setState({
                tableData: tableData,
                loading: false
                });
                self.form.resetFormFileds();
            } else {
              data = new MaterialLot();
              let lotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = lotId;
              data.setLotId(lotId);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
              self.setState({ 
                tableData: tableData,
                loading: false
              });
              self.form.resetFormFileds();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }
    
    handleSubmit = () => {
        const {tableData} = this.state;
        let self = this; 
        let erpTime = self.dataTable.erpTime.picker.state.showDate;
        if(moment.isMoment(erpTime)){
            erpTime = erpTime.format("YYYY-MM-DD");
        }

        if (erpTime == "" || erpTime == null || erpTime == undefined) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectERPTime));
            return;
        }

        if (!tableData || tableData.length == 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
 
        if (this.dataTable.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }

        let requestObject = {
            erpTime : erpTime,
            materialLotList : tableData,
            success: function(responseBody) {
                self.resetData();
                MessageUtils.showOperationSuccess();
            }
        }
        GCRawMaterialImportRequest.sendMobileRawMaterialOtherShipRequest(requestObject);
    }

    handleReset = () => {
        let  self= this;
        this.setState({ 
          tableData: [],
          loading: false
        });
        self.dataTable.erpTime.picker.setState({
          value : "",
        });
        this.form.resetFormFileds();
      }

    buildTable = () => {
        return <MobileRawMaterialOtherShipTable 
            ref={(dataTable) => { this.dataTable = dataTable }}  
            table={this.state.table} 
            data={this.state.tableData} 
            loading={this.state.loading} />
    }
}