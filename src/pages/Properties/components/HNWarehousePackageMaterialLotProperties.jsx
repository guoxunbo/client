import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import PackageValidationRequest from "../../../api/package-validation/PackageValidationRequest";
import HNWarehousePackMaterialLotTable from "../../../components/Table/HNWarehousePackMaterialLotTable";

const PackageType = "HKPackCase";

export default class HNWarehousePackageMaterialLotProperties extends EntityScanProperties{

    static displayName = 'HNWarehousePackageMaterialLotProperties';
      
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              self.validationPackgeRule(queryDatas[0]);
              self.queryNodeFocus();
            } else {
              self.showDataNotFound();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
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
        return <HNWarehousePackMaterialLotTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}