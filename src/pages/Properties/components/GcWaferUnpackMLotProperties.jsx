import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GcWaferUnpackingMLotTable from "../../../components/Table/gc/GcWaferUnpackMLotTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import MaterialLotUnit from "../../../api/dto/mms/MaterialLotUnit";

export default class GcWaferUnpackMLotProperties extends EntityScanProperties{

    static displayName = 'GcWaferUnpackMLotProperties';
    
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
        let data = undefined;
        let lotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
                tableData = queryDatas;

            } else {
                data = new MaterialLotUnit();
                data[rowKey] = lotId;
                data.lotId = lotId;
                data.errorFlag = true;
                if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                    tableData.unshift(data);
                }
            }
            self.setState({
                tableData: tableData,
                loading: false,
                resetFlag: true,
            });
            self.form.resetFormFileds();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GcWaferUnpackingMLotTable 
                            orderTable={this.props.spareOrderTable} 
                            rowKey={this.state.rowKey} 
                            pagination={true} 
                            table={this.state.table} 
                            data={this.state.tableData} 
                            unReservedQty={this.state.unReservedQty}
                            loading={this.state.loading} 
                            resetData={this.resetData.bind(this)}
                            resetFlag={this.state.resetFlag}
                            selectedRowKeys={this.state.selectedRowKeys} 
                            selectedRows={this.state.selectedRows}
                            onSearch={this.props.onSearch}
                            />
    }

}