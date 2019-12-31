import EntityProperties from "./entityProperties/EntityProperties";
import GCMesReceiveTable from "../../../components/Table/gc/GCMesReceiveTable";


const rowKey = "packedLotRrn";

export default class GCMesFinishGoodReceiveProperties extends EntityProperties {
    
    static displayName = 'GCMesFinishGoodReceiveProperties';

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
        return <GCMesReceiveTable     pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

}