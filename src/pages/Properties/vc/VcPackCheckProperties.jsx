import EntityDoubleScanProperties from "@properties/framework/EntityDoubleScanProperties";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import MaterialLotManagerRequest from "@api/gc/material-lot-manager/MaterialLotManagerRequest";
import VcPackCheckTable from "@components/vc/table/VcPackCheckTable";

/**
 * VC 装箱检验
 */
export default class VcPackCheckProperties extends EntityDoubleScanProperties{

    static displayName = 'VcPackCheckProperties';
      
    getTableData = () => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          success: function(responseBody) {
            self.setState({
              table: responseBody.table,
              loading: false
            }); 
          }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);

        let requestCheckDataObject = {
            success: function(responseBody) {
              self.setState({
                judgePackCaseItemList: responseBody.judgePackCaseItemList
              });
            }
        }
        MaterialLotManagerRequest.sendGetJudgePackCaseItemListRequest(requestCheckDataObject);
    }

    loadDataInComponentDidMount = () => {
      let checkNGTableName = this.state.parameters.parameter1;
      let self = this;
      let requestObject = {
          name: checkNGTableName,
          success: function(responseBody) {
              self.setState({
                  packCheckActionTable: responseBody.table,
              });
          }
      }
      TableManagerRequest.sendGetByNameRequest(requestObject);
  }

    buildTable = () => {
        return <VcPackCheckTable {...this.getDefaultTableProps()} 
                                    pagination={false} 
                                    packCheckActionTable = {this.state.packCheckActionTable}  
                                    scanErrorFlag={this.state.scanErrorFlag}/>
    }
}