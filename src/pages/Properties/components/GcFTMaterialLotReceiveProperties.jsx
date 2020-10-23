import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import MaterialLotUnit from "../../../api/dto/mms/MaterialLotUnit";
import GcFTWaitReceiveMaterialLotProperties from "./GcFTWaitReceiveMaterialLotProperties";
import GcFTMaterialLotReceiveTable from "../../../components/Table/gc/GcFTMaterialLotReceiveTable";

export default class GcFTMaterialLotReceiveProperties extends EntityScanProperties{

    static displayName = 'GcFTMaterialLotReceiveProperties';
    
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
     * 扫描的晶圆如果不存在要异常显示。
     */
    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let waitForReceiveMLotUnitList = this.ftWaitReceiveMaterialProperties.state.tableData;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            let data = undefined;
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
                if (waitForReceiveMLotUnitList.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
            } else {
              data = new MaterialLotUnit();
              let unitId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = unitId;
              data.setUnitId(unitId);
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
        return <GcFTMaterialLotReceiveTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

    buildOtherComponent = () => {
      return <GcFTWaitReceiveMaterialLotProperties ref={(ftWaitReceiveMaterialProperties) => { this.ftWaitReceiveMaterialProperties = ftWaitReceiveMaterialProperties }} tableRrn={106274} />
  }
}