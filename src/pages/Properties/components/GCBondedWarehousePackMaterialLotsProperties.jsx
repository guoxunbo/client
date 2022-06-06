import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import PackageValidationRequest from "../../../api/package-validation/PackageValidationRequest";
import GCBondedWarehousePackMaterialLotsTable from "../../../components/Table/GCBondedWarehousePackMaterialLotsTable";

const PackageType = "BSPackCase";

/**
 * 保税仓 成品装箱    同“VBOX装箱”，同湖南仓“装箱”，同香港仓“香港仓装箱”。
 */
export default class GCBondedWarehousePackMaterialLotsProperties extends EntityScanProperties{

    static displayName = 'GCBondedWarehousePackMaterialLotsProperties';
      
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              self.validationPackgeRule(queryDatas[0]);
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
        return <GCBondedWarehousePackMaterialLotsTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}