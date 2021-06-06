import IssueByMaterialOrderTable from "@components/mms/table/IssueByMaterialOrderTable";
import EntityProperties from "../framework/EntityProperties";
import IssueByMaterialOrderScanProperties from "./IssueByMaterialOrderScanProperties";

/**
 * 指定物料 发料
 */
export default class IssueByMaterialOrderProperties extends EntityProperties{

    static displayName = 'IssueByMaterialOrderProperties' ;

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

      if(responseBody.dataList.length == 1 ){
        this.orderTable.selectRow(responseBody.dataList[0]);
      }
      
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
        return <IssueByMaterialOrderScanProperties
                    tableRrn = {this.state.parameters.parameter1}  
                    orderTable = {this.orderTable} 
                    ref={(issueLabMLotScanTable) => { this.issueLabMLotScanTable = issueLabMLotScanTable }}
        />
    }

}