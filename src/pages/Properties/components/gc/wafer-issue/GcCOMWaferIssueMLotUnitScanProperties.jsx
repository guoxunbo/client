import EntityScanProperties from "../../entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";
import GcCOMWaitForIssueMLotUnitProperties from "./GcCOMWaitForIssueMLotUnitProperties";
import GcCOMWaferIssueTable from "../../../../../components/Table/gc/GcCOMWaferIssueTable";

export default class GcCOMWaferIssueMLotUnitScanProperties extends EntityScanProperties{

    static displayName = 'GcCOMWaferIssueMLotUnitScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
        this.form.handleReset();
      }
    }

    /**
     * 扫描的箱号如果不存在要异常显示。
     * 扫描到的晶圆如果不存在在下面的待发料晶圆，也要异常显示
     */
    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let waitForIssueMLotUnitProperties = this.waitForIssueMLotUnitProperties.state.tableData;
        let issueWithDoc = this.comWaferIssueTable.state.value;
        let orders = this.props.orderTable.state.data;
        if (issueWithDoc == "issueWithDoc" && orders.length == 0) {
          Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
          self.setState({ 
            tableData: tableData,
            loading: false
          });
          return;
        }
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            let data = undefined;
            if (queryDatas && queryDatas.length > 0) {
              data = queryDatas[0];
              let materialLots = [];
              let materialLot = new MaterialLot();
              materialLot.setMaterialLotId(data["materialLotId"]);
              materialLots.push(materialLot);
              let validationRequestObject = {
                documentLines: orders,
                materialLots: materialLots,
                success: function(responseBody) {
                  data.workOrderId = responseBody.workOrderId;
                  let errorData = [];
                  let trueData = [];
                  tableData.forEach(data => {
                    if(data.errorFlag){
                      errorData.push(data);
                    } else {
                      trueData.push(data);
                    }
                  });
                  tableData = [];
                  queryDatas.forEach(data => {
                    if (waitForIssueMLotUnitProperties.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                      data.errorFlag = true;
                    }
                    if(data.errorFlag){
                      errorData.unshift(data);
                    } else if(trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                      trueData.unshift(data);
                    }
                  });
                  errorData.forEach(data => {
                    tableData.push(data);
                  });
                  trueData.forEach(data => {
                    tableData.push(data);
                  });
                  self.setState({
                    tableData: tableData,
                    loading: false
                  });
                  self.form.resetFormFileds();
                }
              }
              WaferManagerRequest.sendValidationWaferIssueRequest(validationRequestObject);
            } else {
              data = new MaterialLot();
              let lotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = lotId;
              data.setLotId(lotId);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
              self.setState({ 
                tableData: tableData,
                loading: false
              });
              self.form.resetFormFileds();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    resetOrderData = (orderTable) => {
      orderTable.setState({
        data: [],
        loading: false,
        resetFlag: true
      });
  }

    buildTable = () => {
        return <GcCOMWaferIssueTable orderTable={this.props.orderTable} pagination={false} 
                                    table={this.state.table} 
                                    ref={(comWaferIssueTable) => { this.comWaferIssueTable = comWaferIssueTable }}
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    onSearch={this.props.onSearch}
                                    />
    }

    buildOtherComponent = () => {
      return <GcCOMWaitForIssueMLotUnitProperties ref={(waitForIssueMLotUnitProperties) => { this.waitForIssueMLotUnitProperties = waitForIssueMLotUnitProperties }} tableRrn={77147} />
    }
}