import EntityProperties from "@properties/framework/EntityProperties";
import QuestionTable from "@components/kms/table/QuestionTable";

export default class QuestionProperties extends EntityProperties{

    static displayName = 'QuestionProperties';
    
    buildTable = () => {
        return <QuestionTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}