import MesReceiveFGScanTable from "../../../components/Table/gc/MesReceiveFGScanTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../api/dto/mms/MaterialLot";

const rowKey = "packedLotRrn";

export default class MesFinishGoodScanProperties extends EntityScanProperties{

    static displayName = 'MesFinishGoodScanProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey, showQueryFormButton: false}}
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

    queryData = (whereClause) => {
      const self = this;
      let showData = self.props.showTable.state.data;
      let boxId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          let data = undefined;
          if (queryDatas && queryDatas.length > 0) {
            // 20190921 GC要求只能扫描到在上方查询条件查询之后展示的数据 只会扫出一笔
            let queryData = queryDatas[0];
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
            if (showData.filter(d => d[rowKey] === queryData[rowKey]).length === 0) {
              self.showDataNotFound();
            } else {
              if (trueData.filter(d => d[rowKey] === queryData[rowKey]).length === 0) {
                  // 20190921 GC要求只能新添加的在最上面
                  trueData.unshift(queryData);
                }
            }
            errorData.forEach(data => {
              tableData.push(data);
            });
            trueData.forEach(data => {
              tableData.push(data);
            });
          } else {
            data = new MaterialLot();
            data[rowKey] = boxId;
            data.boxId = boxId;
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
        return <MesReceiveFGScanTable pagination={false} rowKey={this.state.rowKey} 
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