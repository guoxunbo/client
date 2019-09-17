import EntityScanCheckProperties from "./entityProperties/EntityScanCheckProperties";
import MesReceiveFGScanTable from "../../../components/Table/gc/MesReceiveFGScanTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

const rowKey = "packedLotRrn";

export default class MesFinishGoodScanProperties extends EntityScanProperties{

    static displayName = 'MesFinishGoodScanProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey, showQueryFormButton: false}}
    }
      
    buildTable = () => {
        return <MesReceiveFGScanTable pagination={false} rowKey={this.state.rowKey} 
                                    selectedRowKeys={this.state.selectedRowKeys} 
                                    selectedRows={this.state.selectedRows} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}/>
    }
}