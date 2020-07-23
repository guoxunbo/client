import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMaterialLotHoldTable from "../../../components/Table/gc/GCMaterialLotHoldTable";
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import { Notification } from "../../../components/notice/Notice";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";

export default class GCMaterialLotHoldProperties  extends EntityScanProperties {

    static displayName = 'GCMaterialLotHoldProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <GCMaterialLotHoldTable 
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
    
      queryData = (whereClause) => {
          const self = this;
          let {rowKey,tableData} = this.state;
          if(whereClause == ''){
              Notification.showInfo(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty))
              self.setState({ 
                tableData: tableData,
                loading: false
              });
          }else{
            let requestObject = {
              tableRrn: this.state.tableRrn,
              whereClause: whereClause,
              success: function(responseBody) {
                self.setState({
                  tableData: responseBody.dataList,
                  loading: false
                });
              }
            }
            TableManagerRequest.sendGetDataByRrnRequest(requestObject);
          }
      }
}