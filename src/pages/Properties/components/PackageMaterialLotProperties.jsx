import EntityScanProperties from "./entityProperties/EntityScanProperties";
import PackMaterialLotTable from "../../../components/Table/PackMaterialLotTable";
import PackageValidationRequest from "../../../api/package-validation/PackageValidationRequest";

const PackageType = "PackCase";

export default class PackageMaterialLotProperties extends EntityScanProperties{

    static displayName = 'PackageMaterialLotProperties';
      
    afterQuery = (responseBody) => {
        let queryDatas = responseBody.dataList;
        if (queryDatas && queryDatas.length > 0) {
            this.validationPackgeRule(queryDatas[0]);
        } else {
            this.showDataNotFound();
        }
    }
    
    validationPackgeRule(materialLot) {
        let self = this;
        let {rowKey,tableData} = this.state;
        if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
            tableData.unshift(materialLot);
        }
        if (tableData.length == 0) {
            self.setState({ 
                tableData: tableData,
                loading: false
            });
            self.form.resetFormFileds();
        } else {
            let requestObject = {
                packageType: PackageType,
                materialLots: tableData,
                success: function() {
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.form.resetFormFileds();
                },
                fail: function() { 
                    tableData.shift();
                    self.setState({ 
                        tableData: tableData,
                        loading: false
                    });
                    self.allFieldBlur();
                }
            }
            PackageValidationRequest.sendValidationPackRequest(requestObject);
        }
        
    }

    buildTable = () => {
        return <PackMaterialLotTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}