import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCMaterialLotHoldTable from "../../../components/Table/gc/GCMaterialLotHoldTable";

export default class GCMaterialLotHoldProperties  extends EntityScanProperties {

    static displayName = 'GCMaterialLotHoldProperties';

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <GCMaterialLotHoldTable    
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}