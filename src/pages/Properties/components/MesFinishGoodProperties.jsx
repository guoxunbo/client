import MesReceiveFGShowTable from "../../../components/Table/gc/MesReceiveFGShowTable";
import EntityProperties from "./entityProperties/EntityProperties";
import MesFinishGoodScanProperties from "./MesFinishGoodScanProperties";

const rowKey = "packedLotRrn";

export default class MesFinishGoodProperties extends EntityProperties{

    static displayName = 'MesFinishGoodProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey}}
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
      return <MesFinishGoodScanProperties showTable={this.showTable} tableRrn={7728}></MesFinishGoodScanProperties>
  }

}