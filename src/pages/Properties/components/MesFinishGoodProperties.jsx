import MesReceiveFGTable from "../../../components/Table/gc/MesReceiveFGTable";
import EntityScanCheckProperties from "./entityProperties/EntityScanCheckProperties";

export default class MesFinishGoodProperties extends EntityScanCheckProperties{

    static displayName = 'MesFinishGoodProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:"packedLotRrn"}}
      }
      
    buildTable = () => {
        return <MesReceiveFGTable pagination={false} rowKey={this.state.rowKey} selectedRowKeys={this.state.selectedRowKeys} selectedRows={this.state.selectedRows} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }
}