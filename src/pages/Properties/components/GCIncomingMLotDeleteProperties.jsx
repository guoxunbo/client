import EntityProperties from "./entityProperties/EntityProperties";
import GCIncomingMLotDeleteTable from "../../../components/Table/gc/GCIncomingMLotDeleteTable";

export default class GCIncomingMLotDeleteProperties  extends EntityProperties {

    static displayName = 'GCIncomingMaterialImportProperties';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }


    buildTable = () => {
        return <GCIncomingMLotDeleteTable
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}