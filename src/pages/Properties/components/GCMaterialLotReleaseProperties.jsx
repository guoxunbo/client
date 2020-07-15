import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMaterialLotReleaseTable from "../../../components/Table/gc/GCMaterialLotReleaseTable";

export default class GCMaterialLotReleaseProperties  extends EntityScanProperties {

    static displayName = 'GCMaterialLotReleaseProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <GCMaterialLotReleaseTable    
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}