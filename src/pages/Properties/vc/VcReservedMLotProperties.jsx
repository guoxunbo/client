import EntityProperties from "@properties/framework/EntityProperties";
import VcReservedMLotTable from "@components/vc/table/VcReservedMLotTable";
import VcReservedMLotScanProperties from "./VcReservedMLotScanProperties";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";

/**
 * 备货
 * 根据发货通知信息
 * 下表是成品信息
 */
export default class VcReservedMLotProperties extends EntityProperties{

    static displayName =  'VcReservedMLotProperties';

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
        return <VcReservedMLotTable
                        {...this.getDefaultTableProps()}
                        ref = {(orderTable) => {this.orderTable = orderTable}}
                        scrollY={200} 
                        pagination={false} 
                        materialLotScanProperties = {this.materialLotScanProperties}
                        resetData = {this.resetData}
                        />
    }

    buildOtherComponent = () =>{
        return <VcReservedMLotScanProperties
                        tableRrn = {this.state.parameters.parameter1}  
                        orderTable = {this.orderTable} 
                        resetFlag = {this.state.resetFlag} 
                        resetData = {this.resetData}
                        onSearch={this.getTableData.bind(this)}
                        ref = {(materialLotScanProperties) => {this.materialLotScanProperties = materialLotScanProperties}}/>
    }
}
