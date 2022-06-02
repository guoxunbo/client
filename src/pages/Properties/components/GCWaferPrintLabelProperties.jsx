import EntityProperties from "./entityProperties/EntityProperties";
import GCWaferPrintLabelTable from "../../../components/Table/gc/GCWaferPrintLabelTable";

export default class GCWaferPrintLabelProperties  extends EntityProperties {

    static displayName = 'GCWaferPrintLabelProperties';

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
        return <GCWaferPrintLabelTable
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}