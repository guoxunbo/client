import CreateIssueOrderByMLotInfoProperties from "./CreateIssueOrderByMLotInfoProperties";
import CreateLabMLotOrderProperties from "./CreateIssueOrderByMaterialProperties";

/**
 * 创建指定批次领料单
 */
export default class CreateIssueOrderByMLotProperties extends CreateLabMLotOrderProperties{

    static displayName = 'CreateIssueOrderByMLotProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    afterQuery = (responseBody, whereClause) => {
        this.setState({
            tableData: responseBody.dataList,
            loading: false,
            whereClause: whereClause
        });
    }


    buildOtherComponent = () => {
        return <CreateIssueOrderByMLotInfoProperties
                    tableRrn = {this.state.parameters.parameter1}
                    orderTable = {this.orderTable}
                    ref= {(pickOrderProperties) => {this.pickOrderProperties = pickOrderProperties}}/>
    }
}