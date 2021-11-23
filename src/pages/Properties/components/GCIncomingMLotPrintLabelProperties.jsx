import EntityProperties from "./entityProperties/EntityProperties";
import GCIncomingMLotPrintLabelTable from "../../../components/Table/gc/GCIncomingMLotPrintLabelTable";

export default class GCIncomingMLotPrintLabelProperties  extends EntityProperties {

    static displayName = 'GCIncomingMLotPrintLabelProperties';

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
        return <GCIncomingMLotPrintLabelTable
                                      pagination={true} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}