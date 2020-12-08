import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCRawMaterialImportTable from "../../../components/Table/gc/GCRawMaterialImportTable";


export default class GCRawMaterialImportProperties  extends EntityScanProperties {

    static displayName = 'GCRawMaterialImportProperties';

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
        return <GCRawMaterialImportTable 
                                      pagination={true} 
                                      propsFrom = {this.form}
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}