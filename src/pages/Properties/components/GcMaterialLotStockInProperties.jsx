import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockInStorageTable from "../../../components/Table/gc/StockInStorageTable";
import StockInManagerRequest from "../../../api/gc/stock-in/StockInManagerRequest";

/**
 * 物料批次扫描添加后入库
 *  只有一个扫描框，根据不同的开头做不同的事。
 * 先扫描一些ID（此时页面只显示ID，不带出其他信息）扫描到MB开头，则临时记录下来中转箱ID；扫描到ZHJ/HJ开头，则临时记录下货架号；
 * ——新的记录节点
 * 只要扫到不是MB/ZHJ/HJ开头ID，则认为是新的开始（之前记录的数据不再修改）
 */
export default class GcMaterialLotStockInProperties extends EntityScanProperties{

    static displayName = 'GcMaterialLotStockInProperties';
    
    handleSearch = () => {
        let self = this;
        let {rowKey,tableData} = this.state;
        this.setState({loading: true});
        let data = "";
        let queryFields = this.form.state.queryFields;
        if (queryFields.length === 1) {
            data = this.form.props.form.getFieldValue(queryFields[0].name)
        }  
        debugger;
        if (data.startsWith("MB")) {
            // MB开头的则是中装箱号 扫描到MB开头的，则更新表格中中转箱号为空的批次的中转箱号为此中装箱号
            tableData.forEach((materialLot) => {
                if (materialLot["relaxBoxId"] === undefined) {
                    materialLot["relaxBoxId"] = data;
                }
            });
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
        } else if (data.startsWith("ZHJ") || data.startsWith("HJ") ) {
            // ZHJ/HJ 开头的则是库位号 扫描到ZHJ/HJ开头的，则更新表格中库位号为空的库位号为此库位号
            tableData.forEach((materialLot) => {
                if (materialLot["storageId"] === undefined) {
                    materialLot["storageId"] = data;
                }
            });
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
        } else {
            // 物料批次，需要请求后台做查询
            let requestObject = {
                materialLotId: data,
                success: function(responseBody) {
                    let materialLot = responseBody.materialLot;
                    if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                        tableData.unshift(materialLot);
                    }
                    self.setState({ 
                        tableData: tableData,
                        loading: false
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

    buildTable = () => {
        return <StockInStorageTable 
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