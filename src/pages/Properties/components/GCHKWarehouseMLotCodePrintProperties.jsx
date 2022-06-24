import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCHKWarehouseMLotCodePrintTable from "../../../components/Table/gc/GCHKWarehouseMLotCodePrintTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";


export default class GCHKWarehouseMLotCodePrintProperties extends EntityScanProperties{

    static displayName = 'GCHKWarehouseMLotCodePrintProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    resetData = () => {
      this.setState({
        tableData: [],
        loading: false,
        resetFlag: true
      });
  }

  queryData = (whereClause) => {
    const self = this;
    let requestObject = {
      tableRrn: this.state.tableRrn,
      whereClause: whereClause,
      success: function(responseBody) {
        self.setState({
          tableData: responseBody.dataList,
          loading: false
        });
        self.form.resetFormFileds();  
      }
    }
    TableManagerRequest.sendGetDataByRrnRequest(requestObject);
  }

    buildTable = () => {
        return <GCHKWarehouseMLotCodePrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}