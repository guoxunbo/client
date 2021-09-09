import MobileProperties from "../../mobile/MobileProperties";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MobileOldRecordExpressNumberTable from "../../../../../components/Table/gc/MobileOldRecordExpressNumberTable";
import RecordExpressNumberRequest from "../../../../../api/gc/record-express-number/RecordExpressNumberRequest";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";

export default class GcMobileOldRecordExpressNumberProperties extends MobileProperties{

    static displayName = 'GcMobileOldRecordExpressNumberProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
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

    handleSubmit = () => {
        let self = this;
        let datas = self.expressNumberTable.state.data;
        let recordedDatas = datas.filter((data) => data.expressNumber != undefined);
        if (recordedDatas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        let object = {
            datas : recordedDatas,
            success: function(responseBody) {
                responseBody.documentLineList.forEach((deliveryOrder) => {
                    let dataIndex = -1;
                    datas.map((data, index) => {
                        if (data.objectRrn == deliveryOrder.objectRrn) {
                            dataIndex = index;
                        }
                    });
                    datas.splice(dataIndex, 1, deliveryOrder);
                });
                self.setState({
                    data: datas,
                    formVisible: false,
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                MessageUtils.showOperationSuccess();
            }
        };
        RecordExpressNumberRequest.sendOldRecordExpress(object);
    }

    buildTable = () => {
        return <MobileOldRecordExpressNumberTable
                                  pagination={false} 
                                  ref={(expressNumberTable) => { this.expressNumberTable = expressNumberTable }} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading} 
                                  resetData={this.resetData.bind(this)}
                                  queryFrom={this.form}
                                  resetFlag={this.state.resetFlag}
                                  />
    }

}