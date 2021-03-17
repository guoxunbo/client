import VcApproveDocumentTable from "@components/vc/table/VcApproveDocumentTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 审核 单据
 */
export default class VcApproveDocumentProperties extends EntityProperties{

    static displayName =  'VcApproveDocumentProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    } 

    buildTable =()=>{
        return <VcApproveDocumentTable
                        {...this.getDefaultTableProps()}
                        resetData = {this.resetData} />
    }
}
