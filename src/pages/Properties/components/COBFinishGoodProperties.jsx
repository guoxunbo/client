import MesCOBReceiveFGShowTable from "../../../components/Table/gc/MesCOBReceiveFGShowTable";
import COBFinishGoodScanProperties from "./COBFinishGoodScanProperties";
import EntityProperties from "./entityProperties/EntityProperties";

const rowKey = "packedLotRrn";

export default class COBFinishGoodProperties extends EntityProperties{

    static displayName = 'COBFinishGoodProperties';

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
        return <MesCOBReceiveFGShowTable scrollY={200} 
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
      return <COBFinishGoodScanProperties showTable={this.showTable} 
                                            tableRrn={this.state.parameters.parameter1}
                                            resetFlag={this.state.resetFlag} 
                                            onSearch={this.handleSearch.bind(this)} />
  }

}