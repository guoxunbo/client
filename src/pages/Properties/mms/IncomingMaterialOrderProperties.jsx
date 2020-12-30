import EntityProperties from "@properties/framework/EntityProperties";
import IncomingMaterialOrderScanProperties from "./IncomingMaterialOrderScanProperties";
import IncomingMaterialOrderTable from "@components/mms/table/IncomingMaterialOrderTable";

//来料单
export default class IncomingMaterialOrderProperties extends EntityProperties{

    static displayName = 'IncomingMaterialOrderProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, showQueryFormButton: true, parameterTabRrn: this.props.match.params.parameter1 }
    }
   
    /**
     * 当表格里数据做完操作之后，务必调用下此方法把扫描添加进去的state数据清零。不然会把上一次的扫描结果一起带到下一次中去
     */
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
      return <IncomingMaterialOrderTable 
                                    {...this.getDefaultTableProps()}
                                    scrollY={200} 
                                    pagination={false} 
                                    ref={(orderTable) => { this.orderTable = orderTable }} 
                                    materialOrderScanProperties = {this.materialOrderScanProperties}
                                    resetData = {this.resetData}
                                    />
    }

    buildOtherComponent = () => {
      return <IncomingMaterialOrderScanProperties
                                            tableRrn = {this.state.parameterTabRrn}  
                                            orderTable = {this.orderTable} 
                                            resetFlag = {this.state.resetFlag} 
                                            ref={(materialOrderScanProperties) => { this.materialOrderScanProperties = materialOrderScanProperties }}
                                            />
  }

}