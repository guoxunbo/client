import EntityProperties from "./entityProperties/EntityProperties";
import GCCOGDetialDeleteTable from "../../../components/Table/gc/GCCOGDetialDeleteTable";

export default class GCCOGDetialDeleteProperties  extends EntityProperties {

    static displayName = 'GCCOGDetialDeleteProperties';

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
        return <GCCOGDetialDeleteTable     
                                      pagination={false} 
                                      rowKey={this.state.rowKey} 
                                      ref={(showTable) => { this.showTable = showTable }} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} 
                                      resetData={this.resetData.bind(this)}/>
    }
}