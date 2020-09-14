import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMaterialLotCodePrintTable from "../../../components/Table/gc/GCMaterialLotCodePrintTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";


export default class GCMaterialLotCodePrintProperties extends EntityScanProperties{

    static displayName = 'GCMaterialLotCodePrintProperties';
    
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
        return <GCMaterialLotCodePrintTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }
}