import CreateIssueOrderByMaterialTable from "@components/mms/table/CreateIssueOrderByMaterialTable";
import CreateIssueOrderByMaterialInfoProperties from "@properties/mms/CreateIssueOrderByMaterialInfoProperties";
import EntityProperties from "@properties/framework/EntityProperties";
import IssueOrderByMaterialRequest from "@api/issue-order-manager/issue-order-by-material/IssueOrderByMaterialRequest";

export default class CreateIssueOrderByMaterialProperties extends EntityProperties{

    static displayName = 'CreateIssueOrderByMaterialProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    afterQuery = (responseObject, whereClause) => {
        let self = this;
        let object = {
            materials: responseObject.dataList,
            success:function(responseBody){
                self.setState({
                    tableData: responseBody.materials,
                    loading: false,
                    whereClause: whereClause
                  });
            }
        }
        IssueOrderByMaterialRequest.sendGetMaterialStockQtyRequest(object)
    }

    buildTable=()=>{
        return( <CreateIssueOrderByMaterialTable
                {...this.getDefaultTableProps()}
                ref= {(orderTable) => {this.orderTable = orderTable}}
                pickOrderProperties = {this.pickOrderProperties}/>)
    }

    buildOtherComponent = () => {
        return <CreateIssueOrderByMaterialInfoProperties
                    tableRrn = {this.state.parameters.parameter1}
                    createDeptIssueActionTableName = {this.state.parameters.parameter2}
                    orderTable = {this.orderTable}
                    ref= {(pickOrderProperties) => {this.pickOrderProperties = pickOrderProperties}}/>
    }

}