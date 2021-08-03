import CreateIssueOrderByMLotInfoTable from "@components/mms/table/CreateIssueOrderByMLotInfoTable";
import CreateIssueOrderByMaterialInfoProperties from "./CreateIssueOrderByMaterialInfoProperties";

/**
 * 创建指定批次领料单
 */
export default class CreateIssueOrderByMLotInfoProperties extends CreateIssueOrderByMaterialInfoProperties{

    static displayName = 'CreateIssueOrderByMLotInfoProperties';

    buildTable=()=>{
        return( <CreateIssueOrderByMLotInfoTable
                {...this.getDefaultTableProps()}/>)
    }
}