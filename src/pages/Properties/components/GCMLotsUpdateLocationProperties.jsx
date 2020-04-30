import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMLotsUpdateLocationTable from "../../../components/Table/gc/GCMLotsUpdateLocationTable";

export default class GCMLotsUpdateLocationProperties  extends EntityScanProperties {

    static displayName = 'GCMLotsUpdateLocationProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true,
        });
    }

    buildTable = () => {
        return <GCMLotsUpdateLocationTable    
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}