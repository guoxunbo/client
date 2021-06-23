import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import CheckInventoryManagerRequest from "../../../../../api/gc/check-inventory-manager/CheckInventoryManagerRequest";
import MobileMLotCheckTable from "../../../../../components/Table/gc/MobileMLotCheckTable";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";

export default class GCMobileMLotCheckProperties extends MobileProperties{

    static displayName = 'GCMobileMLotStockInProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let data = "";
        let queryFields = this.form.state.queryFields;
        if (queryFields.length === 1) {
            data = this.form.props.form.getFieldValue(queryFields[0].name)
        }
        let requestObject = {
          queryLotId: data,
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            let materialLot = responseBody.materialLot;
            if(materialLot && materialLot.materialLotId != null && materialLot.materialLotId != ""){
              if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                tableData.unshift(materialLot);
              } else {
                self.showDataAlreadyExists();
              }
            } else {
              let errorData = new MaterialLot();
              errorData[rowKey] = data;
              errorData.setMaterialLotId(data);
              errorData.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === errorData[rowKey]).length === 0) {
                tableData.unshift(errorData);
              }else {
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
        CheckInventoryManagerRequest.queryCheckMaterialLot(requestObject);
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
        this.form.state.queryFields[0].node.focus();
        Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataAlreadyExists) + (data || ""));
    }
    
    handleSubmit = () => {
        const {tableData} = this.state;
        let self = this;
        if (!tableData || tableData.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
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