import EntityProperties from "@properties/framework/EntityProperties";
import GeneratorRuleTable from "@components/idgenerator/table/GeneratorRuleTable";

export default class GeneratorRuleProperties extends EntityProperties{

    static displayName = 'GeneratorRuleProperties';
    
    buildTable = () => {
        return <GeneratorRuleTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}