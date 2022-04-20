import EntityScanProperties from "./entityProperties/EntityScanProperties";
import MaterialLot from "../../../api/dto/mms/MaterialLot";
import GcWaitForReceiveMLotUnitProperties from "./GcWaitForReceiveMLotUnitProperties";
import GcReceiveMLotUnitTable from "../../../components/Table/gc/GcReceiveMLotUnitTable";
import WaferManagerRequest from "../../../api/gc/wafer-manager-manager/WaferManagerRequest";

export default class GcWaferReceiveOrderMLotUnitProperties extends EntityScanProperties{

    static displayName = 'GcWaferReceiveOrderMLotUnitProperties';
    
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
     * 扫描到的晶圆如果不存在在下面的待接收晶圆，也要异常显示
     */
    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let queryFields = this.form.state.queryFields;
        let lotId = this.form.props.form.getFieldValue(queryFields[0].name);
        let waitForReceiveMLotUnitProperties = this.waitForReceiveMLotUnitProperties.state.tableData;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          lotId: lotId,
          success: function(responseBody) {
            let materialLot = responseBody.materialLot;
            if (materialLot && materialLot.objectRrn > 0) {
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
              if (waitForReceiveMLotUnitProperties.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                materialLot.errorFlag = true;
              }
              if(materialLot.errorFlag){
                errorData.unshift(materialLot);
              } else if(trueData.filter(d => d[rowKey] === materialLot[rowKey]).length === 0) {
                trueData.unshift(materialLot);
              }
              errorData.forEach(data => {
                tableData.push(data);
              });
              trueData.forEach(data => {
                tableData.push(data);
              });
            } else {
              let data = new MaterialLot();
              let lotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = lotId;
              data.setLotId(lotId);
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
        WaferManagerRequest.sendQueryCOBMaterialLotRequest(requestObject);
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
                                    onSearch={this.props.onSearch}
                                    />
    }

    buildOtherComponent = () => {
      return <GcWaitForReceiveMLotUnitProperties ref={(waitForReceiveMLotUnitProperties) => { this.waitForReceiveMLotUnitProperties = waitForReceiveMLotUnitProperties }} tableRrn={this.props.waitReceiveTableRrn} />
  }
}