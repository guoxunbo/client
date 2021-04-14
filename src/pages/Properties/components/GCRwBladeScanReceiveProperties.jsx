import EntityScanProperties from "./entityProperties/EntityScanProperties";
import { i18NCode } from "../../../api/const/i18n";
import I18NUtils from "../../../api/utils/I18NUtils";
import RwMaterialManagerRequest from "../../../api/gc/rw-material-manager/RwMaterialManagerRequest";
import GCRwBladeScanReceiveTable from "../../../components/Table/gc/GCRwBladeScanReceiveTable";
import { Notification } from "../../../components/notice/Notice";


export default class GCRwBladeScanReceiveProperties extends EntityScanProperties{

    static displayName = 'GCRwBladeScanReceiveProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{handleMLot: "", scanBladeLotIdFlag: false}};
    }

    handleSearch = () => {
      let self = this;
      let {tableData, scanBladeLotIdFlag, handleMLot} = this.state;
      let queryFields = this.form.state.queryFields;
      let bladeMaterialCode = this.form.props.form.getFieldValue(queryFields[0].name);
      if(bladeMaterialCode == undefined || bladeMaterialCode == "" || bladeMaterialCode == null){
        return;
      }
      if(scanBladeLotIdFlag){
        let requestObject = {
          materialLotCode: bladeMaterialCode,
          success: function(responseBody) {
            let materialLotId = responseBody.materialLotId;
            let materialLotIdList = [];
            tableData.forEach(data => {
              if(data.materialLotId){
                materialLotIdList.push(data.materialLotId);
              }
            });
            if(materialLotIdList.includes(materialLotId)){
              Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DataAlreadyExists) + materialLotId);
              self.setState({ 
                tableData: tableData,
                loading: false,
              });
              self.form.resetFormFileds();
            } else {
              handleMLot.materialLotId = materialLotId;
              let dataIndex = -1;
              tableData.map((data, index) => {
                if (data.objectRrn == handleMLot.objectRrn) {
                  dataIndex = index;
                }
              });
              tableData.splice(dataIndex, 1, handleMLot);
    
              handleMLot = "";
              self.setState({ 
                tableData: tableData,
                loading: false,
                scanBladeLotIdFlag: false,
                handleMLot: handleMLot
              });
              self.form.resetFormFileds();
            }
          }
        }
        RwMaterialManagerRequest.sendValidateAndGetMaterialLotIdRequest(requestObject);
      } else {
        // 扫描Blade型号，请求后台查询验证是否存在该型号
        let requestObject = {
          bladeMaterialCode: bladeMaterialCode,
          success: function(responseBody) {
              let materialLot = responseBody.materialLot;
              //临时用数据序号做为主键
              let objectRrn = tableData.length;
              materialLot.objectRrn = objectRrn;
              tableData.unshift(materialLot);

              handleMLot = materialLot;
              self.setState({ 
                  tableData: tableData,
                  loading: false,
                  scanBladeLotIdFlag: true,
                  handleMLot: handleMLot
              });
              self.form.resetFormFileds();
          }
        }
        RwMaterialManagerRequest.sendBladeMaterialRequest(requestObject);
      }
    }

    buildTable = () => {
        return <GCRwBladeScanReceiveTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}