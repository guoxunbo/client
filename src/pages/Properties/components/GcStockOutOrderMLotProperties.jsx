import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcStockOutMLotTable from "../../../components/Table/gc/GcStockOutMLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

export default class GcStockOutOrderMLotProperties extends EntityScanProperties{

    static displayName = 'GcStockOutOrderMLotProperties';
    
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
          this.setState({
              tableData: [],
              loading: false
          });
      }
    }

    queryData = (whereClause) => {
        const self = this;
        if (!this.props.orderTable.getSingleSelectedRow()) {
            self.setState({ 
                loading: false
            });
            return;
        }
        let {rowKey,tableData} = this.state;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
              queryDatas.forEach(data => {
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
        return <GcStockOutMLotTable 
                            orderTable={this.props.orderTable} 
                            pagination={false} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            />
    }

}