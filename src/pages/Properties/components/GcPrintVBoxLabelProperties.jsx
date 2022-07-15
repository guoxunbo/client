import EntityProperties from "./entityProperties/EntityProperties";
import GcPrintVBoxLabelTable from "../../../components/Table/gc/GcPrintVBoxLabelTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GetPrintVboxParameterRequest from "../../../api/gc/get-print-vbox-parameter/GetPrintVboxParameterRequest";

const rowKey = "packedLotRrn";

export default class GcPrintVBoxLabelProperties extends EntityScanProperties{

    static displayName = 'GcPrintVBoxLabelProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey}}
    }
    
    /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    queryData = (whereClause) => {
      const self = this;
      let {rowKey,tableData} = this.state;
      let vboxId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
      let requestObject = {
        tableRrn: this.state.tableRrn,
        vboxId: vboxId,
        success: function(responseBody) {
          let mesPackedLot = responseBody.mesPackedLot;
          if (mesPackedLot && mesPackedLot.boxId != undefined) {
            if (tableData.filter(d => d.boxId === mesPackedLot.boxId).length === 0) {
              tableData.unshift(mesPackedLot);
            }
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
      GetPrintVboxParameterRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <GcPrintVBoxLabelTable pagination={false} rowKey={this.state.rowKey} 
                                        selectedRowKeys={this.state.selectedRowKeys} 
                                        selectedRows={this.state.selectedRows} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}/>
    }

}