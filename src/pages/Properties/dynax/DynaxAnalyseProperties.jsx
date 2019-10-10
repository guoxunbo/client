import EntityProperties from "@properties/framework/EntityProperties";
import DynaxAnalyseTable from "@components/dynax/table/DynaxAnalyseTable";

export default class DynaxAnalyseProperties extends EntityProperties{

    static displayName = 'DynaxAnalyseProperties';
    
    buildTable = () => {
        return <DynaxAnalyseTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}