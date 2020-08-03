import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCIncomingMaterialImportTable from "../../../components/Table/gc/GCIncomingMaterialImportTable";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";

export default class GCIncomingMaterialImportProperties  extends EntityScanProperties {

    static displayName = 'GCIncomingMaterialImportProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }


    buildTable = () => {
        return <GCIncomingMaterialImportTable 
                                      pagination={false} 
                                      propsFrom = {this.form}
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}