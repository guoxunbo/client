import EntityScanProperties from "../../entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../../../api/dto/mms/MaterialLot";
import GcWaferIssueOutOrderTable from "../../../../../components/Table/gc/GcWaferIssueOutOrderTable";
import GcWaitOutOrderIssueMLotUnitProperties from "./GcWaitOutOrderIssueMLotUnitProperties";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { Notification } from "../../../../../components/notice/Notice";
import { i18NCode } from "../../../../../api/const/i18n";


export default class GcWaferIssueOutOrderProperties extends EntityScanProperties{

    static displayName = 'GcWaferIssueOutOrderProperties';
    
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
      if(whereClause == ''){
        Notification.showInfo(I18NUtils.getClientMessage(i18NCode.SearchFieldCannotEmpty))
        self.setState({ 
          tableData: tableData,
          loading: false
        });
      } else if(tableData.length == 10){
        Notification.showNotice(I18NUtils.getClientMessage(i18NCode.MaterialLotIssueQtyCannotMoreThanTen));
        self.setState({ 
          tableData: tableData,
          loading: false
        });
        self.form.resetFormFileds();
        return;
      } else {
        let waitOutOrderIssueMLotUnit = this.waitOutOrderIssueMLotUnit.state.tableData;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
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
                  if (waitOutOrderIssueMLotUnit.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
            } else {
              let data = new MaterialLot();
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
    }

    buildTable = () => {
        return <GcWaferIssueOutOrderTable
                                    pagination={false} 
                                    ref={(waferIssueTable) => { this.waferIssueTable = waferIssueTable }}
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

    buildOtherComponent = () => {
      return <GcWaitOutOrderIssueMLotUnitProperties ref={(waitOutOrderIssueMLotUnit) => { this.waitOutOrderIssueMLotUnit = waitOutOrderIssueMLotUnit }} tableRrn={469275} />
    }
}