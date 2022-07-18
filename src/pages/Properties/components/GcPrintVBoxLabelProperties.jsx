import GcPrintVBoxLabelTable from "../../../components/Table/gc/GcPrintVBoxLabelTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

const rowKey = "packedLotRrn";

export default class GcPrintVBoxLabelProperties extends EntityScanProperties{

    static displayName = 'GcPrintVBoxLabelProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state,...{rowKey:rowKey}}
    }

    buildTable = () => {
        return <GcPrintVBoxLabelTable pagination={false} rowKey={this.state.rowKey} 
                                        selectedRowKeys={this.state.selectedRowKeys} 
                                        selectedRows={this.state.selectedRows} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}/>
    }

}