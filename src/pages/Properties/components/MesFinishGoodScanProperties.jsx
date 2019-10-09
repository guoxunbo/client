import MesReceiveFGScanTable from "../../../components/Table/gc/MesReceiveFGScanTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

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

    afterQuery = (responseBody) => {
      let {rowKey,tableData} = this.state;
      let showData = this.props.showTable.state.data;
      let queryDatas = responseBody.dataList;
      if (queryDatas && queryDatas.length > 0) {
        // 20190921 GC要求只能扫描到在上方查询条件查询之后展示的数据 只会扫出一笔
        let queryData = queryDatas[0];
        if (showData.filter(d => d[rowKey] === queryData[rowKey]).length === 0) {
          this.showDataNotFound();
        } else {
          if (tableData.filter(d => d[rowKey] === queryData[rowKey]).length === 0) {
              // 20190921 GC要求只能新添加的在最上面
              tableData.unshift(queryData);
            }
            this.setState({ 
              tableData: tableData,
              loading: false
            });
            this.form.resetFormFileds();
        }
      } else {
        this.showDataNotFound();
      }
    }

    buildTable = () => {
        return <MesReceiveFGScanTable pagination={false} rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}/>
    }
}