import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCCancelCheckTable from "../../../components/Table/gc/GCCancelCheckTable";
import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Notification } from "../../../components/notice/Notice";

export default class GCCancelCheckProperties  extends EntityScanProperties {

    static displayName = 'GCCancelCheckProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
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
        return;
      } else {
        let queryFields = this.form.state.queryFields;
        let queryLotId = this.form.props.form.getFieldValue(queryFields[0].name);
        let requestObject = {
          tableRrn: this.state.tableRrn,
          queryLotId: queryLotId,
          success: function(responseBody) {
            let materialLot = responseBody.materialLot;
            if (materialLot) {
              if (tableData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                tableData.unshift(materialLot);
              }
              self.setState({ 
                tableData: tableData,
                loading: false
              });
              self.form.resetFormFileds();
            } else {
              self.showDataNotFound();
            }
          } 
        }
      MaterialLotManagerRequest.sendQueryMaterialLotIdOrLotIdRequest(requestObject);
    }
  }


  buildTable = () => {
    return <GCCancelCheckTable 
                            pagination={false} 
                            rowKey={this.state.rowKey} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}/>
  }
}