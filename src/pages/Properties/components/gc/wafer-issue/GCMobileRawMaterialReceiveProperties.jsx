import MobileProperties from "../../mobile/MobileProperties";
import MobileRawMaterialReceiveTable from "../../../../../components/Table/gc/MobileRawMaterialReceiveTable";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import FinishGoodInvManagerRequest from "../../../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import StockInManagerRequest from "../../../../../api/gc/stock-in/StockInManagerRequest";

export default class GCMobileRawMaterialReceiveProperties extends MobileProperties{

    static displayName = 'GCMobileRawMaterialReceiveProperties';
    
    constructor(props) {
      super(props);
      this.state = {...this.state, rowKey: "objectRrn"};
    }

    queryData = (whereClause) => {
      let self = this;
      const{table} = this.state;
      let {rowKey,tableData} = this.state;
      this.setState({loading: true});
      let data = "";
      let queryFields = this.form.state.queryFields;
      if (queryFields.length === 1) {
          data = this.form.props.form.getFieldValue(queryFields[0].name);
      }  
       // MB开头的则是中装箱号 扫描到MB开头的，则更新当前操作的物料批次的中装箱号
      let dataIndex = -1;
      if (data.startsWith("MB") || data.startsWith("TB") || data.startsWith("CM")) {
          tableData.forEach((materialLot) => {
              tableData.map((data, index) => {
                  if (data[rowKey] == materialLot[rowKey]) {
                      dataIndex = index;
                  }
              });
              if(!materialLot.relaxBoxId){
                  materialLot["relaxBoxId"] = data;
                  tableData.splice(dataIndex, 1, materialLot);
              }
          });
          self.setState({ 
              tableData: tableData,
              loading: false,
          });
          self.form.resetFormFileds();
      } else if (data.startsWith("ZHJ ") || data.startsWith("HJ ") ) {
          // ZHJ/HJ 开头的则是库位号 扫描到ZHJ/HJ开头的，则更新当前操作的物料批次的库位号
          tableData.forEach((materialLot) => {
              tableData.map((data, index) => {
                  if (data[rowKey] == materialLot[rowKey]) {
                      dataIndex = index;
                  }
              });
              if(!materialLot.storageId){
                  materialLot["storageId"] = data;
                  tableData.splice(dataIndex, 1, materialLot);
              }
          });
          self.setState({ 
              tableData: tableData,
              loading: false,
          });
          self.form.resetFormFileds();
      } else {
          let requestObject = {
              materialLotId: data,
              tableRrn: table.objectRrn,
              success: function(responseBody) {
                  let materialLotList = responseBody.materialLotList;
                  if (materialLotList && materialLotList.length > 0) {
                      let errorData = [];
                      let trueData = [];
                      tableData.forEach(mLot => {
                      if(mLot.errorFlag){
                          errorData.push(mLot);
                      } else {
                          trueData.push(mLot);
                      }
                      });
                      tableData = [];
                      materialLotList.forEach(materialLot => {
                          if(trueData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                              trueData.unshift(materialLot);
                          } else if(!data.startsWith("GCB")){
                              trueData.map((mLot, index) => {
                                  if (mLot[rowKey] == materialLot[rowKey]) {
                                      dataIndex = index;
                                      materialLot["storageId"] = mLot.storageId;
                                      materialLot["relaxBoxId"] = mLot.relaxBoxId;
                                  }
                              });
                              materialLot.scanFlag = true;
                              trueData.splice(dataIndex, 1, materialLot);
                          } 
                      });
                      errorData.forEach(mLot => {
                          tableData.push(mLot);
                      });
                      trueData.forEach(mLot => {
                          tableData.push(mLot);
                      });
                } else {
                  let mLot = new MaterialLot();
                  mLot[rowKey] = data;
                  mLot.setMaterialLotId(data);
                  mLot.errorFlag = true;
                  if (tableData.filter(d => d[rowKey] === mLot[rowKey]).length === 0) {
                    tableData.unshift(mLot);
                  }
                }
               
                self.setState({ 
                  tableData: tableData,
                  loading: false
                });
                self.form.resetFormFileds();
              }
            }
          StockInManagerRequest.sendQueryRawMaterialRequest(requestObject);
      }
    }

    handleSubmit = () => {
      const {tableData} = this.state;
        let self = this;
        if (!tableData || tableData.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if (self.orderTable.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }

        if(!this.validationStorageId(tableData)) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.StorageCannotEmpty));
            return;
        }
        
        let result = this.twoScanIRAvalidation(tableData);
        if(result != ""){
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.RawMaterialMustBeTwoScanValidate)+ ":" + result);
            return;
        }
       
        let requestObject = {
            materialLots: tableData,
            success: function(responseBody) {            
                self.resetData();              
                MessageUtils.showOperationSuccess();
            }
        }
        StockInManagerRequest.sendStockInRequest(requestObject);
    }

    validationStorageId = (data) =>{
      let flag = true;
      data.forEach((materialLot) => {
          if( materialLot.storageId == undefined){
              flag = false;
              return flag;
          }
      });
      return flag;
    }

    twoScanIRAvalidation = (data) =>{
        let result = "";
        data.forEach((materialLot) => {
            if(materialLot.materialType == "IRA" && materialLot.reserved8 != undefined && materialLot.scanFlag == undefined){
                result = materialLot.materialLotId;
                return result;
            }
        });
        return result;
    }

    buildTable = () => {
        return <MobileRawMaterialReceiveTable ref={(orderTable) => { this.orderTable = orderTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }


}