import EntityProperties from "@properties/framework/EntityProperties";
import EntityHistoryTable from "@components/framework/table/EntityHistoryTable";

export default class EntityHistoryProperties extends EntityProperties{

    static displayName = 'EntityHistoryProperties';
    
    buildTable = () => {
        return <EntityHistoryTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}