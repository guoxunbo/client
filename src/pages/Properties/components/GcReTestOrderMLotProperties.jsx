import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcReTestMLotTable from "../../../components/Table/gc/GcReTestMLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcWaitForReTestMLotProperties from "./GcWaitForReTestMLotProperties";
import MaterialLot from "../../../api/dto/mms/MaterialLot";

export default class GcReTestOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcReTestOrderMLotProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    /**
     * 20190921 gc要求重置的时候，2个表格数据都要清空
     */
    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
        this.form.handleReset();
      }
    }

    /**
     * 扫描的物料批次如果不存在要异常显示。
     * 扫描到的物料批次如果不存在在下面的待重测发料列表里，也要异常显示
     */
    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let waitForReTestMLotsProperties = this.waitForReTestMLotsProperties.state.tableData;
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
                if (waitForReTestMLotsProperties.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
        return <GcReTestMLotTable orderTable={this.props.orderTable} pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    onSearch={this.props.onSearch}
                                    />
    }

    buildOtherComponent = () => {
      return <GcWaitForReTestMLotProperties ref={(waitForReTestMLotsProperties) => { this.waitForReTestMLotsProperties = waitForReTestMLotsProperties }} tableRrn={this.props.waitRetestTableRrn} />
  }
}