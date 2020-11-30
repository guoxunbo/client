import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GCBatchCancelExpressNumberTable from "../../../components/Table/gc/GCBatchCancelExpressNumberTable";
import RecordExpressNumberRequest from "../../../api/gc/record-express-number/RecordExpressNumberRequest";


export default class GCBatchCancelExpressNumberProperties extends EntityScanProperties{

    static displayName = 'GCBatchCancelExpressNumberProperties';


    handleSearch = () => {
      const self = this;
      let {tableData} = this.state;
      let queryFields = this.form.state.queryFields;
      let wayBillNumber = this.form.props.form.getFieldValue(queryFields[0].name);
      if(wayBillNumber == undefined || wayBillNumber == "" || wayBillNumber == null){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty));
        self.setState({ 
          tableData: tableData,
          loading: false,
        });
        return;
      }

      let requestObject = {
        wayBillNumber: wayBillNumber,
        success: function(responseBody) {
          let orderInfo = responseBody.orderInfo;
          if (orderInfo) {
            if (tableData.filter(d => d.waybillNumber === orderInfo.waybillNumber).length === 0) {
              tableData.unshift(orderInfo);
            }
            self.setState({ 
              tableData: tableData,
              loading: false,
            });
            self.form.resetFormFileds();
          } else {
            self.showDataNotFound();
          }
        }
      }
      RecordExpressNumberRequest.sendGetWayBillNumberRequest(requestObject);
    }

    buildTable = () => {
        return <GCBatchCancelExpressNumberTable pagination={false} 
                                    rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}/>
    }

}