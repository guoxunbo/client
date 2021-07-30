import MobileProperties from "../../mobile/MobileProperties";
import StockInManagerRequest from "../../../../../api/gc/stock-in/StockInManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileIRAReceiveStockInTable from "../../../../../components/Table/gc/MobileIRAReceiveStockInTable";
import MessageUtils from "../../../../../api/utils/MessageUtils";

export default class GcMobileIRAReceiveStockInProperties extends MobileProperties{

    static displayName = 'GcMobileIRAReceiveStockInProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    queryData = () => {
        let self = this;
        const{table} = this.state;
        let {rowKey,tableData} = this.state;
        this.setState({loading: true});
        let data = "";
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
        if (queryFields.length === 1) {
            data = this.form.props.form.getFieldValue(queryFields[0].name)
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
        } else if (data.startsWith("GCB")) {
            let requestObject = {
                materialLotId: data,
                tableRrn: table.objectRrn,
                success: function(responseBody) {                 
                    let materialLotList = responseBody.materialLotList;
                    if (materialLotList && materialLotList.length > 0) {
                        tableData = materialLotList;
                    } else {
                        let wrongData = self.createErrorData(data, rowKey);
                        if (tableData.filter(d => d[rowKey] === wrongData[rowKey]).length === 0) {
                            tableData.unshift(wrongData);
                        }
                    }
                    self.setState({
                        tableData: tableData,
                        loading: false,
                        resetFlag: true,
                    });
                    self.form.resetFormFileds();
                }
              }
            StockInManagerRequest.sendQueryRawMaterialRequest(requestObject);
        } else {
            if (tableData.length == 0) {
                Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseScanPackageId) + data);
                self.form.resetFormFileds();
                self.setState({ 
                  tableData: tableData,
                  loading: false,
                });
                return;
            }
            if (data && data != null) {
                let errorData = [];
                let trueData = [];
                tableData.forEach(mLot => {
                    if(mLot.errorFlag){
                        errorData.push(mLot);
                    } else {
                        trueData.push(mLot);
                    }
                });  
                trueData.map((mLot, index) => {
                    if (mLot.materialLotId == data) {
                        dataIndex = index;
                    } 
                });
                if(dataIndex != -1){
                    let materialLot = trueData[dataIndex];
                    if(materialLot.scanFlag){
                        materialLot.scanSecondFlag = true;
                    } else {
                        materialLot.scanFlag = true;
                    }
                    trueData.splice(dataIndex, 1, materialLot);
                } else {
                    let wrongData = this.createErrorData(data, rowKey);
                    if (errorData.filter(d => d[rowKey] === wrongData[rowKey]).length === 0) {
                        errorData.unshift(wrongData);
                    } else {
                        this.showDataAlreadyExists();
                    }
                }
                tableData = [];
                errorData.forEach(mLot => {
                    tableData.push(mLot);
                });
                trueData.forEach(mLot => {
                    tableData.push(mLot);
                });
            }
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
        }
    }

    handleSubmit = () => {
        const {tableData} = this.state;
        let self = this;
        if (!tableData || tableData == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if (self.orderTable.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }

        if (self.orderTable.getRepeatScanCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.MaterialLotIdRepeat));
            return;
        }

        if(!self.validationStorageId(tableData)) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.StorageCannotEmpty));
            return;
        }
        
        let result = self.twoScanIRAvalidation(tableData);
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

    showDataAlreadyExists = () => {
        // 如果只有一个条件，则提示具体条件
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
  
    createErrorData = (data, rowKey) => {
        let errorData = new MaterialLot();
        errorData[rowKey] = data;
        errorData.errorFlag = true;
        errorData.setLotId(data);
        return errorData;
    }

    twoScanIRAvalidation = (tableData) =>{
        let result = "";
        tableData.forEach((materialLot) => {
            if(materialLot.materialType == "IRA" && materialLot.scanFlag == undefined){
                result = materialLot.materialLotId;
                return result;
            }
        });
        return result;
    }
    
    validationStorageId = (tableData) =>{
        let flag = true;
        tableData.forEach((materialLot) => {
            if( materialLot.storageId == undefined){
                flag = false;
                return flag;
            }
        });
        return flag;
    }

    buildTable = () => {
        return <MobileIRAReceiveStockInTable 
                                    ref={(orderTable) => { this.orderTable = orderTable }} 
                                    pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}