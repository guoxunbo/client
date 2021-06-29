import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockInManagerRequest from "../../../api/gc/stock-in/StockInManagerRequest";
import RawMaterialStockInStorageTable from "../../../components/Table/gc/RawMaterialStockInStorageTable";
import GcRawMaterialWaitStockInProperties from "./GcRawMaterialWaitStockInProperties";
import MaterialLot from "../../../api/dto/mms/MaterialLot";

export default class GcRawMaterialStockInProperties extends EntityScanProperties{

    static displayName = 'GcRawMaterialStockInProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    handleSearch = () => {
        let self = this;
        const{table} = this.state;
        let {rowKey,tableData} = this.state;
        let waitStockInRawMaterialList = this.waitStockInRawMaterial.state.tableData;
        this.setState({loading: true});
        let data = "";
        let queryFields = this.form.state.queryFields;
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
                            if (waitStockInRawMaterialList.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                                materialLot.errorFlag = true;
                            }
                            if(materialLot.errorFlag){
                                errorData.unshift(materialLot);
                            } else if(trueData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
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

    buildTable = () => {
        return <RawMaterialStockInStorageTable 
                                    pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

    buildOtherComponent = () => {
        return <GcRawMaterialWaitStockInProperties 
                        ref={(waitStockInRawMaterial) => { this.waitStockInRawMaterial = waitStockInRawMaterial }} 
                        tableRrn={this.state.parameters.parameter1} />
    }
}