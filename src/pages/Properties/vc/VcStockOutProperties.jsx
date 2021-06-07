import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import VcStockOutTable from "@components/vc/table/VcStockOutTable";
import EntityProperties from "@properties/framework/EntityProperties";
import VcStockOutScanProperties from "./VcStockOutScanProperties";

/**
 * 发货
 */
export default class VcStockOutProperties extends EntityProperties{

    static displayName =  'VcStockOutProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }

    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    getTableData = () => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
              tableData: responseBody.dataList,
              table: responseBody.table,
              loading: false
            }); 
            self.form.handleSearch();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }


    buildTable =()=>{
        return <VcStockOutTable
                        {...this.getDefaultTableProps()}
                        scrollY={200} 
                        pagination={false} 
                        ref={(deliverOrderTable) => { this.deliverOrderTable = deliverOrderTable }}
                        materialLotScanTable = {this.materialLotScanTable}
                        resetData = {this.resetData}/>
    }

    buildOtherComponent = () => {
        return <VcStockOutScanProperties
                        tableRrn = {this.state.parameters.parameter1}  
                        deliverOrderTable = {this.deliverOrderTable} 
                        resetFlag = {this.state.resetFlag} 
                        onSearch={this.getTableData.bind(this)}
                        ref={(materialLotScanTable) => { this.materialLotScanTable = materialLotScanTable }}/>
    }

}
