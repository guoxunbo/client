import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import GcRMAMaterialLotReceiveTable from "../../../components/Table/gc/GcRMAMaterialLotReceiveTable";
import GcRMAWaitReceiveMaterialLotProperties from "./GcRMAWaitReceiveMaterialLotProperties";
import MaterialLot from "../../../api/dto/mms/MaterialLot";

export default class GcRMAMaterialLotReceiveProperties extends EntityScanProperties{

    static displayName = 'GcRMAMaterialLotReceiveProperties';
    
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
        let waitForReceiveMLotList = this.RMAWaitReceive.state.tableData;
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
                if (waitForReceiveMLotList.filter(d => d[rowKey] === data[rowKey]).length === 0) {
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
              let boxId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = boxId;
              data.setMaterialLotId(boxId);
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
        return <GcRMAMaterialLotReceiveTable pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

    buildOtherComponent = () => {
      return <GcRMAWaitReceiveMaterialLotProperties ref={(RMAWaitReceive) => { this.RMAWaitReceive = RMAWaitReceive }} tableRrn={468118} />
  }
}