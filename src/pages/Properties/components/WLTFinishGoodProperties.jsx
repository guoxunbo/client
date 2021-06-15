import MesReceiveFGShowTable from "../../../components/Table/gc/MesReceiveFGShowTable";
import EntityProperties from "./entityProperties/EntityProperties";
import WLTFinishGoodScanProperties from "./WLTFinishGoodScanProperties";

const rowKey = "packedLotRrn";

export default class WLTFinishGoodProperties extends EntityProperties{

    static displayName = 'WLTFinishGoodProperties';

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
        return <MesReceiveFGShowTable scrollY={200} 
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
      return <WLTFinishGoodScanProperties showTable={this.showTable} 
                                            tableRrn={this.state.parameters.parameter1}
                                            resetFlag={this.state.resetFlag} 
                                            onSearch={this.handleSearch.bind(this)} />
  }

}