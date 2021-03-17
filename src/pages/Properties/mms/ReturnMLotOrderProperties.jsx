import ReturnMLotOrderTable from "@components/mms/table/ReturnMLotOrderTable";
import EntityProperties from "@properties/framework/EntityProperties";
import ReturnMLotOrderScanProperties from "./ReturnMLotOrderScanProperties";


export default class ReturnMaterialOrderProperties extends EntityProperties{

    static displayName = 'ReturnMaterialOrderProperties';

    constructor(props) {
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
    
    buildTable = () => {
      return <ReturnMLotOrderTable
                  {...this.getDefaultTableProps()}
                  scrollY={200} 
                  pagination={false} 
                  ref={(orderTable) => { this.orderTable = orderTable }} 
                  orderScanTable = {this.orderScanTable}
                  resetData = {this.resetData}
      />
    }

    buildOtherComponent = () => {
      return <ReturnMLotOrderScanProperties
                  tableRrn = {this.state.parameters.parameter1}  
                  orderTable = {this.orderTable} 
                  resetFlag = {this.state.resetFlag} 
                  ref={(orderScanTable) => { this.orderScanTable = orderScanTable }}
      />
  }
}