import IssueOrderByMaterialRequest from "@api/issue-order-manager/issue-order-by-material/IssueOrderByMaterialRequest";
import RecommendIssueMLotTable from "@components/mms/table/RecommendIssueMLotTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

/**
 * 给指定物料发料 推荐批次 
 */
export default class RecommendIssueMLotProperties extends EntityScanProperties{

    static displayName = 'RecommendIssueMLotProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, docId:''}
    }


    queryData=()=>{
        let self = this;
        let documentId = this.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let objectRequest = {
            documentId: documentId,
            success:function(responseBody){
                self.orderTable.setState({
                    data:responseBody.materialLots,
                    loading: false,
                    docId:documentId
                })
            }
        }
        IssueOrderByMaterialRequest.sendRecommendIssueMaterialRequest(objectRequest);
    }

    buildTable=()=>{
        return( <RecommendIssueMLotTable
                {...this.getDefaultTableProps()}
                ref={(orderTable) => { this.orderTable = orderTable }}/>)
    }
}