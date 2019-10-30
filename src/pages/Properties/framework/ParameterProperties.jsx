import EntityProperties from "@properties/framework/EntityProperties";
import ParameterTable from "@components/framework/table/ParameterTable";

export default class ParameterProperties extends EntityProperties{

    static displayName = 'ParameterProperties';
    
    buildTable = () => {
        return <ParameterTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}