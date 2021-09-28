import ReturnOrderScanProperties from "./ReturnOrderScanProperties";
import ReturnMLotOrderProperties from "./ReturnMLotOrderProperties";
import ReturnOrderTable from "@components/mms/table/ReturnOrderTable";

/**
 * 仓库退到供应商
 */
export default class ReturnOrderProperties extends ReturnMLotOrderProperties{

    static displayName = 'ReturnOrderProperties';

    resetData = () => {
        this.setState({
            selectedRowKeys: [],
            selectedRows: [],
            tableData: [],
            loading: false,
            resetFlag: true
        });
        this.orderScanProperties.resetData();
    }

    buildGetDate= () =>{
        this.handleSearch(this.state.whereClause)
    }

    buildTable = () => {
        return <ReturnOrderTable
                  {...this.getDefaultTableProps()}
                  scrollY={200} 
                  pagination={false} 
                  ref={(orderTable) => { this.orderTable = orderTable }}                   
                  orderScanProperties = {this.orderScanProperties}
                  resetData = {this.resetData}/>
    }

    buildOtherComponent = () => {
        return (<ReturnOrderScanProperties
                    tableRrn = {this.state.parameters.parameter1}  
                    orderTable = {this.orderTable} 
                    ref={(orderScanProperties) => { this.orderScanProperties = orderScanProperties }}
                    resetFlag = {this.state.resetFlag}
                    onSearch={this.buildGetDate.bind(this)} />)
    }

}