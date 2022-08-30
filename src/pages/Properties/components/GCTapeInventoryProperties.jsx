import EntityScanProperties from "./entityProperties/EntityScanProperties";
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import MaterialLot from "../../../api/dto/mms/MaterialLot";
import GCRawMaterialInventoryTable from "../../../components/Table/gc/GCRawMaterialInventoryTable";
import GCRawMaterialImportRequest from "../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest";

export default class GCTapeInventoryProperties  extends EntityScanProperties {

    static displayName = 'GCTapeInventoryProperties';

    queryData = (whereClause) => {
        debugger;
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
          queryLotId: queryLotId.slice(0, queryLotId.length - 1),
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

    buildTable = () => {
        return <GCRawMaterialInventoryTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}