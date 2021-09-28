import CreateIssueOrderByMaterialInfoTable from "@components/mms/table/CreateIssueOrderByMaterialInfoTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class CreateIssueOrderByMaterialInfoProperties extends EntityProperties{

    static displayName = 'CreateIssueOrderByMaterialInfoProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTable=()=>{
        return( <CreateIssueOrderByMaterialInfoTable
                {...this.getDefaultTableProps()}
                createDeptIssueActionTableName = {this.props.createDeptIssueActionTableName}/>)
    }
}