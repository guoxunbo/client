import EntityScanProperties from "../../entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MaterialLotUnit from "../../../../../api/dto/mms/MaterialLotUnit";
import GcFTOutOrderIssueTable from "../../../../../components/Table/gc/GcFTOutOrderIssueTable";
import GcFTOutOrderWaitIssueProperties from "./GcFTOutOrderWaitIssueProperties";

export default class GcFTOutOrderIssueUnitScanProperties extends EntityScanProperties{

    static displayName = 'GcFTOutOrderIssueUnitScanProperties';
    
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
          let waitForIssueMLotUnitData = this.ftWaitForIssueUnitProperties.state.tableData;
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
                  if (waitForIssueMLotUnitData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
                let data = new MaterialLotUnit();
                let unitId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
                data[rowKey] = unitId;
                data.setUnitId(unitId);
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
        return <GcFTOutOrderIssueTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

    buildOtherComponent = () => {
      return <GcFTOutOrderWaitIssueProperties ref={(ftWaitForIssueUnitProperties) => { this.ftWaitForIssueUnitProperties = ftWaitForIssueUnitProperties }} tableRrn={469412} />
    }
}