import EntityProperties from "./entityProperties/EntityProperties";
import GCRawMaterialDeleteTable from "../../../components/Table/gc/GCRawMaterialDeleteTable";

export default class GCRawMaterialDeleteProperties  extends EntityProperties {

    static displayName = 'GCRawMaterialDeleteProperties';

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
        return <GCRawMaterialDeleteTable
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}