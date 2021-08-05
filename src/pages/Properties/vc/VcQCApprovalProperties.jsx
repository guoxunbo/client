import VcQCApprovalTable from "@components/vc/table/VcQCApprovalTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class VcQCApprovalProperties extends EntityProperties{

    static displayName = 'VcQCApprovalProperties';
    
    buildTable = () => {
        return <VcQCApprovalTable {...this.getDefaultTableProps()} actionTableName={this.state.parameters.parameter1}/>
    }

}