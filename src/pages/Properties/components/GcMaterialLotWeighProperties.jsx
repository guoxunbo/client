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
        const{table} = this.state;
        let {rowKey, tableData, currentHandleMLots} = this.state;
        this.setState({loading: true});
        let data = "";
        let queryFields = this.form.state.queryFields;
        data = this.form.props.form.getFieldValue(queryFields[0].name);
        let dataIndex = -1;
        if((data == undefined || data == "")) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty));
            self.setState({ 
                tableData: tableData,
                loading: false
            });
           // 如果扫描的是数字，则更新当前列表中没有添加重量的箱号，存在多箱没有重量时，给多箱称重标记
        } else if (data != undefined &&  data.startsWith("0000")  && parseFloat(data).toString() != "NaN") {
            if (tableData.length == 0){
                Notification.showInfo(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            }
            currentHandleMLots = this.getNotScanWeightMaterialLots(tableData);
            let boxsWeightSeq = this.getBoxsScanWeightSeq(tableData);
            if(currentHandleMLots.length == 0){
                Notification.showInfo(I18NUtils.getClientMessage(i18NCode.AddOneRowPlease));
            } else if(currentHandleMLots.length >= 2){
                let boxsWeight = parseInt(data,10)/10000;
                tableData.forEach((materialLot) => {
                    currentHandleMLots.map((data, index) => {
                        if (data[rowKey] == materialLot[rowKey]) {
                            dataIndex = index;
                            materialLot["weight"] = boxsWeight.toFixed(3);
                            materialLot.boxsScanSeq = boxsWeightSeq;
                            materialLot["boxsWeightFlag"] = 1;
                            if(materialLot.theoryWeight){
                                let floatValue = materialLot.floatValue;
                                let disWeight = Math.abs(materialLot.weight - materialLot.theoryWeight);
                                if(disWeight > floatValue){
                                    materialLot.errorFlag = true;
                                }
                            }
                            tableData.splice(dataIndex, 1, materialLot);
                        }
                    });
                });
            } else {
                data = parseInt(data,10)/10000;
                currentHandleMLots.forEach((materialLot) => {
                    tableData.map((data, index) => {
                        if (data[rowKey] == materialLot[rowKey]) {
                            dataIndex = index;
                        }
                    });
                    if(!materialLot.weight){
                        materialLot["weight"] = data.toFixed(3);
                        if(materialLot.theoryWeight){
                            let floatValue = materialLot.floatValue;
                            let disWeight = Math.abs(materialLot.weight - materialLot.theoryWeight);
                            if(disWeight > floatValue){
                                materialLot.errorFlag = true;
                            }
                        }
                        tableData.splice(dataIndex, 1, materialLot);
                    }
                });
            }
            self.setState({ 
                tableData: tableData,
                loading: false,
            });
            self.form.resetFormFileds();
        } else if (data != undefined){
            let requestObject = {
                materialLotId: data,
                tableRrn: table.objectRrn,
                success: function(responseBody) {
                    let materialLot = responseBody.materialLot;
                    if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                        let size = tableData.length;
                        let productType = materialLot.reserved7;
                        let scanSeq = size + 1;
                        materialLot["scanSeq"] = scanSeq;
                        if(productType == "COM" && (materialLot.theoryWeight == null || materialLot.theoryWeight == undefined || materialLot.theoryWeight == "")){
                            materialLot.errorFlag = true;
                        }
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

    getBoxsScanWeightSeq(tableData){
        let boxsWeightSeq = 0;
        tableData.forEach((materialLot) => {
            if(materialLot.boxsScanSeq && materialLot.boxsScanSeq > boxsWeightSeq){
                boxsWeightSeq = materialLot.boxsScanSeq;
            }
        });
        return boxsWeightSeq + 1;
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