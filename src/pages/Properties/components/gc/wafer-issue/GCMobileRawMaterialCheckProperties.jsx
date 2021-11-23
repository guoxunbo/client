import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import CheckInventoryManagerRequest from "../../../../../api/gc/check-inventory-manager/CheckInventoryManagerRequest";
import MobileMLotCheckTable from "../../../../../components/Table/gc/MobileMLotCheckTable";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import GCRawMaterialImportRequest from "../../../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest";

export default class GCMobileRawMaterialCheckProperties extends MobileProperties{

    static displayName = 'GCMobileRawMaterialCheckProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    queryData = (whereClause) => {
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
        if(self.dataTable.getErrorCount() > 0 ){
          Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
          self.setState({ 
            tableData: tableData,
            loading: false,
          });
          self.form.resetFormFileds();
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
                if (trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  trueData.unshift(data);
                } else {
                  self.showDataAlreadyExists();
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
              } else {
                self.showDataAlreadyExists();
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

    showDataAlreadyExists = () => {
      const self = this;
      let queryFields = this.form.state.queryFields;
      let data = this.form.props.form.getFieldValue(queryFields[0].name);
      this.setState({ 
          loading: false
      });
      this.allFieldBlur();
      self.form.resetFormFileds();
      Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataAlreadyExists) + (data || ""));
    }
    
    handleSubmit = () => {
        const {tableData} = this.state;
        let self = this;
        if (!tableData || tableData.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if(this.dataTable.getErrorCount() > 0){
          Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
          return;
        }
        let existMaterialLots = this.state.tableData.filter((d) => d.errorFlag === undefined || d.errorFlag === false);
        let errorMaterialLots = this.state.tableData.filter((d) => d.errorFlag && d.errorFlag === true);
        let requestObject = {
            existMaterialLots: existMaterialLots,
            errorMaterialLots: errorMaterialLots,
            success: function() {
                self.handleReset();
                MessageUtils.showOperationSuccess();
            }
        }
        CheckInventoryManagerRequest.sendCheckInventory(requestObject);
    }

    buildTable = () => {
        return <MobileMLotCheckTable ref={(dataTable) => { this.dataTable = dataTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }
}