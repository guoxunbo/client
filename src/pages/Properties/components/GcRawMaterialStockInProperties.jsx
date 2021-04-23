import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockInManagerRequest from "../../../api/gc/stock-in/StockInManagerRequest";
import RawMaterialStockInStorageTable from "../../../components/Table/gc/RawMaterialStockInStorageTable";

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
                    materialLotList.forEach((materialLot) =>{
                        if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                            tableData.unshift(materialLot);
                        } else if(!data.startsWith("RB")){
                            tableData.map((mLot, index) => {
                                if (mLot[rowKey] == materialLot[rowKey]) {
                                    dataIndex = index;
                                    materialLot["storageId"] = mLot.storageId;
                                    materialLot["relaxBoxId"] = mLot.relaxBoxId;
                                }
                            });
                            materialLot.scanFlag = true;
                            tableData.splice(dataIndex, 1, materialLot);
                        }
                    });
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

}