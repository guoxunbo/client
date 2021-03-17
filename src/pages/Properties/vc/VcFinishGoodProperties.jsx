import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import VcFinishGoodTable from "@components/vc/table/VcFinishGoodTable";
import EntityProperties from "@properties/framework/EntityProperties";
import VcFinishGoodScanProperties from "@properties/vc/VcFinishGoodScanProperties";

/**
 * 成品接收
 */
export default class VcFinishGoodProperties extends EntityProperties{

    static displayName =  'VcFinishGoodProperties';

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
        return <VcFinishGoodTable
                        {...this.getDefaultTableProps()}
                        scrollY={200} 
                        pagination={false} 
                        ref={(orderTable) => { this.orderTable = orderTable }}
                        materialLotScanTable = {this.materialLotScanTable}
                        resetData = {this.resetData}
                        />
    }

    buildOtherComponent = () => {
        return <VcFinishGoodScanProperties
                        tableRrn = {this.state.parameters.parameter1}  
                        orderTable = {this.orderTable} 
                        resetFlag = {this.state.resetFlag} 
                        onSearch={this.getTableData.bind(this)}
                        ref={(materialLotScanTable) => { this.materialLotScanTable = materialLotScanTable }}
                        />
    }
}
