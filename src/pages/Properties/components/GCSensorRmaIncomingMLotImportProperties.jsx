import EntityScanProperties from "./entityProperties/EntityScanProperties";
import GCSensorRmaIncomingMLotImportTable from "../../../components/Table/gc/GCSensorRmaIncomingMLotImportTable";

export default class GCSensorRmaIncomingMLotImportProperties  extends EntityScanProperties {

    static displayName = 'GCSensorRmaIncomingMLotImportProperties';

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
        return <GCSensorRmaIncomingMLotImportTable 
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