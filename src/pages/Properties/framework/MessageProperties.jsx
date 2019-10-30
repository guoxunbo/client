import EntityProperties from "@properties/framework/EntityProperties";
import MessageTable from "@components/framework/table/MessageTable";

export default class MessageProperties extends EntityProperties{

    static displayName = 'MessageProperties';
    
    buildTable = () => {
        return <MessageTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}