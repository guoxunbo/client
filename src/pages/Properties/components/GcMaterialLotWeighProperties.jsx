import EntityScanProperties from "./entityProperties/EntityScanProperties";
import MaterialLotWeighTable from "../../../components/Table/gc/MaterialLotWeighTable";
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import WeightManagerRequest from "../../../api/gc/weight-manager/WeightManagerRequest";

export default class GcMaterialLotWeighProperties extends EntityScanProperties {

    static displayName = 'GcMaterialLotWeighProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{currentHandleMLots:[]}};
      }

      handleSearch = () => {
        let self = this;
        let {rowKey, tableData, currentHandleMLots} = this.state;
        this.setState({loading: true});
        let data = "";
        let boxsWeight = "";
        let queryFields = this.form.state.queryFields;
        data = this.form.props.form.getFieldValue(queryFields[0].name);
        boxsWeight = this.form.props.form.getFieldValue(queryFields[1].name);
        let dataIndex = -1;
        if((data == undefined || data == "") && boxsWeight == undefined) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty));
            self.setState({ 
                tableData: tableData,
                loading: false
            });
        } else if(data != undefined && boxsWeight != undefined){
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.ThereScanFieldCanOnlyBeOne));
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
            this.form.state.queryFields[0].node.focus();
            //如果扫描的是第一个扫描框，并且扫描的是文本则请求后台查询数据
        } else if (data != undefined &&  parseFloat(data).toString() == "NaN"){
            let requestObject = {
                materialLotId: data,
                success: function(responseBody) {
                    let materialLot = responseBody.materialLot;
                    if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                        tableData.unshift(materialLot);
                    }
                    self.setState({ 
                        tableData: tableData,
                        loading: false,
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
            WeightManagerRequest.sendQueryRequest(requestObject);
            // 如果扫描的是第一个扫描框，并且扫描的是数字，则更新当前列表中没有添加重量的箱号
        } else if (data != undefined &&  parseFloat(data).toString() != "NaN") {
            currentHandleMLots = this.getNotScanWeightMaterialLots(tableData);
            if(currentHandleMLots.length == 0){
                Notification.showInfo(I18NUtils.getClientMessage(i18NCode.AddOneRowPlease));
            } else if(currentHandleMLots.length >= 2){
                Notification.showInfo(I18NUtils.getClientMessage(i18NCode.CaseWeightNotScanned));
            } else {
                currentHandleMLots.forEach((materialLot) => {
                    tableData.map((data, index) => {
                        if (data[rowKey] == materialLot[rowKey]) {
                            dataIndex = index;
                        }
                    });
                    if(!materialLot.weight){
                        materialLot["weight"] = data;
                        tableData.splice(dataIndex, 1, materialLot);
                    }
                });
            }
            self.setState({ 
                tableData: tableData,
                loading: false,
            });
            self.form.resetFormFileds();
            //如果扫描的是多箱称重，则更新列表中所有箱号的重量
        } else if (boxsWeight != undefined) {
            if(parseFloat(boxsWeight).toString() == "NaN"){
                Notification.showInfo(I18NUtils.getClientMessage(i18NCode.WeightMustBeNumber));
            } else {
                currentHandleMLots = this.getNotScanWeightMaterialLots(tableData);
                if (tableData.length == 0){
                    Notification.showInfo(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
                } else if(currentHandleMLots.length != tableData.length){
                    Notification.showInfo(I18NUtils.getClientMessage(i18NCode.AllBoxWeightMustBeEmpty));
                } else {
                    tableData.forEach((materialLot) => {
                        tableData.map((data, index) => {
                            if (data[rowKey] == materialLot[rowKey]) {
                                dataIndex = index;
                                materialLot["weight"] = boxsWeight;
                                materialLot["boxsWeightFlag"] = 1;
                                tableData.splice(dataIndex, 1, materialLot);
                            }
                        });      
                    });
                }
            }
            self.setState({ 
                tableData: tableData,
                loading: false,
            });
            self.form.resetFormFileds();
        }
    }

    getNotScanWeightMaterialLots(tableData){
        let materialLots = [];
        tableData.forEach((materialLot) => {
            if(!materialLot.weight){
                materialLots.push(materialLot);
            }
        });
        return materialLots;
    }

    buildTable = () => {
        return <MaterialLotWeighTable 
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