import EntityProperties from "./entityProperties/EntityProperties";
import GcPrintQRCodeLabelTable from "../../../components/Table/gc/GcPrintQRCodeLabelTable";
import EntityScanProperties from "./entityProperties/EntityScanProperties";

export default class GcPrintQRCodeLabelProperties extends EntityScanProperties{

    static displayName = 'GcPrintQRCodeLabelProperties';

    constructor(props) {
        super(props);
        this.state= {...this.state}
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
        return <GcPrintQRCodeLabelTable pagination={false} rowKey={this.state.rowKey} 
                                        selectedRowKeys={this.state.selectedRowKeys} 
                                        selectedRows={this.state.selectedRows} 
                                        table={this.state.table} 
                                        data={this.state.tableData} 
                                        loading={this.state.loading} 
                                        resetData={this.resetData.bind(this)}
                                        resetFlag={this.state.resetFlag}/>
    }

}