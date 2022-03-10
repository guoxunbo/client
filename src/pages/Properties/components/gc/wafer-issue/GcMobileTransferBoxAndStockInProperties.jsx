import MobileProperties from "../../mobile/MobileProperties";
import StockInManagerRequest from "../../../../../api/gc/stock-in/StockInManagerRequest";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MobileTransferBoxAndStockInTable from "../../../../../components/Table/gc/MobileTransferBoxAndStockInTable";
import EventUtils from "../../../../../api/utils/EventUtils";

export default class GcMobileTransferBoxAndStockInProperties extends MobileProperties{

    static displayName = 'GcMobileTransferBoxAndStockInProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    queryData = () => {
        let self = this;
        const{table} = this.state;
        let {rowKey,tableData, scanRelaxBoxOrStorageFlag, currentHandleMLots} = this.state;
        this.setState({loading: true});
        let data = "";
        let queryFields = this.form.state.queryFields;
        if (queryFields.length === 1) {
            data = this.form.props.form.getFieldValue(queryFields[0].name)
        }  
         // MB开头的则是中装箱号 扫描到MB开头的，则更新当前操作的物料批次的中装箱号
        let dataIndex = -1;
        if (data.startsWith("MB") || data.startsWith("TB") || data.startsWith("CM") || data.startsWith("ZTB") || data.startsWith("ZCB")) {
            // console.log(currentHandleMLots);
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
                // scanRelaxBoxOrStorageFlag: true,
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
                // scanRelaxBoxOrStorageFlag: true,
            });
            self.form.resetFormFileds();
        } else {
            // 物料批次，需要请求后台做查询
            let requestObject = {
                materialLotId: data,
                tableRrn: table.objectRrn,
                success: function(responseBody) {
                    let materialLot = responseBody.materialLot;
                    if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                        tableData.unshift(materialLot);
                    }
                    // 如果扫描过中装箱号或者库位号，则表示上次操作的批次已经结束，作为新起点继续下次操作
                    // if (scanRelaxBoxOrStorageFlag) {
                    //     currentHandleMLots = []; 
                    // }
                    // currentHandleMLots.push(materialLot);
                    self.setState({ 
                        tableData: tableData,
                        loading: false,
                        // scanRelaxBoxOrStorageFlag: false,
                        // currentHandleMLots: currentHandleMLots
                    });
                    self.form.resetFormFileds();
                },
                fail: function() {
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.form.resetFormFileds();
                }
            }
            StockInManagerRequest.sendQueryRequest(requestObject);
        }
       
    }

    handleSubmit = () => {
        const {tableData} = this.state;
        let self = this;
        if (!tableData || tableData.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if(!this.validationStorageId(tableData)) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.StorageCannotEmpty));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
       
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

    buildTable = () => {
        return <MobileTransferBoxAndStockInTable 
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