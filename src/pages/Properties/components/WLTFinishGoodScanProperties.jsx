import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import WLTReceiveFGScanTable from "../../../components/Table/gc/WLTReceiveFGScanTable";
import MaterialLot from "../../../api/dto/mms/MaterialLot";

const rowKey = "packedLotRrn";

export default class WLTFinishGoodScanProperties extends EntityScanProperties{

    static displayName = 'WLTFinishGoodScanProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey, showQueryFormButton: false}}
    }


    componentWillReceiveProps = (props) => {
        const {resetFlag} = props;
        if (resetFlag) {
           this.form.handleReset();
        }
    }

    queryData = (whereClause) => {
      const self = this;
      let cstId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
      let showData = self.props.showTable.state.data;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          let data = undefined;

          if (queryDatas && queryDatas.length > 0) {
          //GC要求扫描错误的放到最上面显示，扫描正确的显示在错误信息的下方
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
            let scanSeq = 0;
            if(trueData.length > 0){
              let cstIdList = [];
              trueData.forEach(data => {
                if (cstIdList.indexOf(data.cstId) == -1) {
                    cstIdList.push(data.cstId);
                    scanSeq = scanSeq + 1;
                }
            });
            }
            queryDatas.forEach(data => {
              if (showData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                data.errorFlag = true;
              }
              if (trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                data.scanSeq = scanSeq + 1;
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
            data[rowKey] = cstId;
            data.cstId = cstId;
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

    buildTable = () => {
        return <WLTReceiveFGScanTable pagination={false} rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    onSearch={this.props.onSearch}/>
    }
}