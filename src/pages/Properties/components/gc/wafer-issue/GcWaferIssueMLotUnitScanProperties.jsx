import EntityScanProperties from "../../entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import GcWaferIssueTable from "../../../../../components/Table/gc/GcWaferIssueTable";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";
import GcWaitForIssueMLotUnitProperties from "./GcWaitForIssueMLotUnitProperties";
import MaterialLotUnit from "../../../../../api/dto/mms/MaterialLotUnit";


export default class GcWaferIssueMLotUnitScanProperties extends EntityScanProperties{

    static displayName = 'GcWaferIssueMLotUnitScanProperties';
    
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

        let orders = this.props.orderTable.state.data;
        if (orders.length == 0) {
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
                  queryDatas.forEach(data => {
                    if (waitForIssueMLotUnitProperties.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                      data.errorFlag = true;
                    }
                    if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                      tableData.unshift(data);
                    }
                  })
                  self.setState({ 
                    tableData: tableData,
                    loading: false
                  });
                }         
              }
              WaferManagerRequest.sendValidationWaferIssueRequest(validationRequestObject);
            } else {
              data = new MaterialLot();
              let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = materialLotId;
              data.setMaterialLotId(materialLotId);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            }
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
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
        return <GcWaferIssueTable orderTable={this.props.orderTable} pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    onSearch={this.props.onSearch}
                                    />
    }

    buildOtherComponent = () => {
      return <GcWaitForIssueMLotUnitProperties ref={(waitForIssueMLotUnitProperties) => { this.waitForIssueMLotUnitProperties = waitForIssueMLotUnitProperties }} tableRrn={70656} />
    }
}