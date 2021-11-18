import EntityScanProperties from "./entityProperties/EntityScanProperties";
import StockInStorageTable from "../../../components/Table/gc/StockInStorageTable";
import StockInManagerRequest from "../../../api/gc/stock-in/StockInManagerRequest";

/**
 * 晶圆扫描添加后入库
 *  只有一个扫描框，根据不同的开头做不同的事。
 * 先扫描一些ID 此时页面只显示ID，不带出其他信息）扫描到MB开头，则临时记录下来中转箱ID；扫描到HJ开头，则临时记录下货架号；其他都是物料批次号
 * ——新的记录节点
 * 只要扫到不是HJ开头ID，则认为是新的开始（之前记录的数据不再修改）
 */
export default class GcBondedWarehouseWaferStockInProperties extends EntityScanProperties{

    static displayName = 'GcBondedWarehouseWaferStockInProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{currentHandleMLots:[], scanRelaxBoxOrStorageFlag: false}};
      }

    handleSearch = () => {
        let self = this;
        const {table} = this.state;
        let {rowKey,tableData} = this.state;
        this.setState({loading: true});
        let data = "";
        let queryFields = this.form.state.queryFields;
        if (queryFields.length === 1) {
            data = this.form.props.form.getFieldValue(queryFields[0].name)
        }  
        let dataIndex = -1;
        if (data.startsWith("HJ ")) {
            // HJ 开头的则是库位号 扫描到HJ开头的，则更新当前操作的物料批次的库位号
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
            // 晶圆信息，需要请求后台做查询
            let requestObject = {
                lotId: data,
                tableRrn: table.objectRrn,
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
            StockInManagerRequest.sendQueryWaferRequest(requestObject);
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