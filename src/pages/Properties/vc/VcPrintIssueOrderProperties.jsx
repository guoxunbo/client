import EntityProperties from "@properties/framework/EntityProperties";
import VcPrintIssueOrderTable from "@components/vc/table/VcPrintIssueOrderTable";
import IssueOrderRequest from "@api/issue-order-manager/issue-lot-order/IssueOrderRequest";

/**
 * 打印发料单标签
 */
export default class VcPrintIssueOrderProperties extends EntityProperties{

    static displayName =  'VcPrintIssueOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, showQueryFormButton: true, document:{} };
    }

    queryData = (whereClause) => {
        let self = this;
        let documentId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let object = {
            documentId: documentId,
            success: function(responseBody) {
                self.setState({
                    document: responseBody.document,
                    tableData:responseBody.materialLots,
                    whereClause: documentId,
                    loading: false,
                });
            }
        }
        IssueOrderRequest.sendGetPrintIssueOrderRequest(object);
    }

    buildTable =()=>{
        return <VcPrintIssueOrderTable
                        {...this.getDefaultTableProps()}
                        document = {this.state.document}/>
    }


}
