import EntityProperties from "./entityProperties/EntityProperties";
import GcCogEcretiveMaterialDeleteTable from "../../../components/Table/gc/GcCogEcretiveMaterialDeleteTable";

export default class GcCogEcretiveMaterialDeleteProperties extends EntityProperties{

    static displayName = 'GcCogEcretiveMaterialDeleteProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }
    
    resetData = () => {
        this.setState({
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }
    
    buildTable = () => {
        return <GcCogEcretiveMaterialDeleteTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}