import GCRwWaitReceivePackedLotable from "../../../components/Table/gc/GCRwWaitReceivePackedLotable";
import EntityProperties from "./entityProperties/EntityProperties";
import GCRwReceivePackedLotScanProperties from "./GCRwReceivePackedLotScanProperties";

const rowKey = "packedLotRrn";

export default class GCRwFinishGoodProperties extends EntityProperties{

    static displayName = 'GCRwFinishGoodProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey}}
    }
    
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
        return <GCRwWaitReceivePackedLotable scrollY={200} 
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
      return <GCRwReceivePackedLotScanProperties showTable={this.showTable} 
                                            tableRrn={this.state.parameters.parameter1}
                                            resetFlag={this.state.resetFlag} 
                                            onSearch={this.handleSearch.bind(this)} />
  }

}