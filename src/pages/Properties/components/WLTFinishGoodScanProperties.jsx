import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import WLTReceiveFGScanTable from "../../../components/Table/gc/WLTReceiveFGScanTable";

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
      let showData = self.props.showTable.state.data;
      let {rowKey,tableData} = this.state;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          let queryDatas = responseBody.dataList;
          if (queryDatas && queryDatas.length > 0) {
            queryDatas.forEach(data => {
              if (showData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                data.errorFlag = true;
              }
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            });
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          } else {
            self.showDataNotFound();
          }
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
                                    resetFlag={this.state.resetFlag}/>
    }
}