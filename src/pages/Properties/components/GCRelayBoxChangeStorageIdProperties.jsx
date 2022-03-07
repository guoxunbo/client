import EntityScanProperties from "./entityProperties/EntityScanProperties";
import RelayBoxStockInManagerRequest from "../../../api/gc/relayBox-stock-in/RelayBoxStockInManagerRequest";
import RelayBoxChangeStorageIdTable from "../../../components/Table/gc/RelayBoxChangeStorageIdTable";

export default class GCRelayBoxChangeStorageIdProperties extends EntityScanProperties {

    static displayName = 'RelayBoxChangeStorageIdProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{currentHandleMLots:[]}};
    }

    handleSearch = () => {
        let self = this;
        let {rowKey, tableData} = this.state;
        this.setState({loading: true});
        let data = "";
        let queryFields = this.form.state.queryFields;
        if (queryFields.length === 1) {
            data = this.form.props.form.getFieldValue(queryFields[0].name)
        }

         // MB开头的则是中装箱号，请求后台查询出所有该中转箱下的真空包
        let dataIndex = -1;
        if ((data.startsWith("MB") || data.startsWith("TB") || data.startsWith("CM") || data.startsWith("ZTB")) && data.split(".").length == 1) {
            let requestObject = {
                relayBoxId: data,
                success: function(responseBody) {
                    let materialLots = responseBody.materialLots;
                    materialLots.forEach((materialLot) => {
                        if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                            tableData.unshift(materialLot);
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
            RelayBoxStockInManagerRequest.sendQueryRelayBoxRequest(requestObject);
        } else if ((data.startsWith("ZHJ ") || data.startsWith("HJ ")) && data.split(".").length == 1 ) {
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
            // 物料批次，需要请求后台做查询
            let requestObject = {
                materialLotId: data,
                tableRrn: this.state.tableRrn,
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
            RelayBoxStockInManagerRequest.sendQueryBoxRequest(requestObject);
        }
    }

    buildTable = () => {
        return <RelayBoxChangeStorageIdTable
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