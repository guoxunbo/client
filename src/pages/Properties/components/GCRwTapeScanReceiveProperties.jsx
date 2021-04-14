import EntityScanProperties from "./entityProperties/EntityScanProperties";
import { i18NCode } from "../../../api/const/i18n";
import I18NUtils from "../../../api/utils/I18NUtils";
import RwMaterialManagerRequest from "../../../api/gc/rw-material-manager/RwMaterialManagerRequest";
import GCRwTapeScanReceiveTable from "../../../components/Table/gc/GCRwTapeScanReceiveTable";


export default class GCRwTapeScanReceiveProperties extends EntityScanProperties{

    static displayName = 'GCRwTapeScanReceiveProperties';


    handleSearch = () => {
      const self = this;
      let {tableData} = this.state;
      let queryFields = this.form.state.queryFields;
      let tapeMaterialCode = this.form.props.form.getFieldValue(queryFields[0].name);
      if(tapeMaterialCode == undefined || tapeMaterialCode == "" || tapeMaterialCode == null){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty));
        self.setState({ 
          tableData: tableData,
          loading: false,
        });
        return;
      }

      let requestObject = {
        tapeMaterialCode: tapeMaterialCode,
        success: function(responseBody) {
          debugger;
          let materialLotList = responseBody.materialLotList;
          if (materialLotList) {
            if(tableData && tableData.length > 0){
              if(self.validateTapaAndMaterialLotId(tapeMaterialCode)){
                materialLotList.forEach(data => {
                  if (tableData.filter(d => d.materialLotId === data.materialLotId).length === 0) {
                    tableData.unshift(data);
                  }
                });
              }
            } else {
              materialLotList.forEach(data => {
                  tableData.unshift(data);
              });
            }
            self.setState({ 
              tableData: tableData,
              loading: false,
            });
            self.form.resetFormFileds();
          } else {
            self.showDataNotFound();
          }
        }
      }
      RwMaterialManagerRequest.sendGetMaterialLotByTapeCode(requestObject);
    }

    validateTapaAndMaterialLotId(tapeCode){
      let falg = true;
      let {tableData} = this.state;
      let tapeCodeList = [];
      tableData.forEach(data => {
        if (tapeCodeList.indexOf(data.tapeMaterialCode) == -1) {
          tapeCodeList.push(data.tapeMaterialCode);
        }
      });
      if(tapeCodeList.includes(tapeCode)){
        falg = false;
      }
      return falg;
    }

    buildTable = () => {
        return <GCRwTapeScanReceiveTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    propsFrom = {this.form}
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}