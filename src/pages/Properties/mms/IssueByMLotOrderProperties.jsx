import IssueByMaterialOrderTable from "@components/mms/table/IssueByMaterialOrderTable";
import EntityProperties from "../framework/EntityProperties";
import IssueByMLotOrderScanProperties from "./IssueByMLotOrderScanProperties";

/**
 * 指定批次 发料
 */
export default class IssueByMLotOrderProperties extends EntityProperties{

    static displayName = 'IssueByMLotOrderProperties' ;

    constructor (props) {
        super(props);
        this.state = {...this.state}
    }

    afterQuery = (responseBody, whereClause) => {
      this.setState({
        tableData: responseBody.dataList,
        loading: false,
        whereClause: whereClause
      });   
  }

    buildTable = () => {
        return <IssueByMaterialOrderTable
                    {...this.getDefaultTableProps()}
                    scrollY={200} 
                    pagination={false} 
                    ref={(orderTable) => { this.orderTable = orderTable }} 
                    issueLabMLotScanTable = {this.issueLabMLotScanTable}
        />
    }

    buildOtherComponent= () =>{
        return <IssueByMLotOrderScanProperties
                    tableRrn = {this.state.parameters.parameter1}  
                    orderTable = {this.orderTable} 
                    ref={(issueLabMLotScanTable) => { this.issueLabMLotScanTable = issueLabMLotScanTable }}
        />
    }

}