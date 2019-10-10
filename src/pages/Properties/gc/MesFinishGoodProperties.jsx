import MesReceiveFGShowTable from "@components/gc/table/MesReceiveFGShowTable";
import EntityProperties from "@properties/framework/EntityProperties";
import MesFinishGoodScanProperties from "./MesFinishGoodScanProperties";

const rowKey = "packedLotRrn";

export default class MesFinishGoodProperties extends EntityProperties{

    static displayName = 'MesFinishGoodProperties';

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

    buildTable = () => {
        return <MesReceiveFGShowTable scrollY={200} 
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
      return <MesFinishGoodScanProperties showTable={this.showTable} 
                                            tableRrn={7728}
                                            resetFlag={this.state.resetFlag}>
      </MesFinishGoodScanProperties>
  }

}