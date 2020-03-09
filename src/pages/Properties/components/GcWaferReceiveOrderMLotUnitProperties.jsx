import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReTestMLotTable from "../../../components/Table/gc/GcReTestMLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import MaterialLotUnit from "../../../api/dto/mms/MaterialLotUnit";
import GcWaitForReceiveMLotUnitProperties from "./GcWaitForReceiveMLotUnitProperties";
import GcReceiveMLotUnitTable from "../../../components/Table/gc/GcReceiveMLotUnitTable";

export default class GcWaferReceiveOrderMLotUnitProperties extends EntityScanProperties{

    static displayName = 'GcWaferReceiveOrderMLotUnitProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
        window.location.reload(true);
        // this.form.handleReset();
      }
    }

    /**
     * 扫描的晶圆如果不存在要异常显示。
     * 扫描到的晶圆如果不存在在下面的待接收晶圆，也要异常显示
     */
    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let waitForReceiveMLotUnitProperties = this.waitForReceiveMLotUnitProperties.state.tableData;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            let data = undefined;
            if (queryDatas && queryDatas.length > 0) {
              queryDatas.forEach(data => {
                if (waitForReceiveMLotUnitProperties.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  data.errorFlag = true;
                }
                if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  tableData.unshift(data);
                }
              });
            } else {
              data = new MaterialLotUnit();
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
        return <GcReceiveMLotUnitTable orderTable={this.props.orderTable} pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

    buildOtherComponent = () => {
      return <GcWaitForReceiveMLotUnitProperties ref={(waitForReceiveMLotUnitProperties) => { this.waitForReceiveMLotUnitProperties = waitForReceiveMLotUnitProperties }} tableRrn={99141} />
  }
}