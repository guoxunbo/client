import IqcCheckTable from "@components/mms/table/IqcCheckTable";
import EntityProperties from "@properties/framework/EntityProperties";
import IqcCheckScanProperties from "./IqcCheckScanProperties";

export default class IqcCheckProperties extends EntityProperties{

    static displayName = 'IqcCheckProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state, parameterTabRrn: this.props.match.params.parameter1}
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
        return <IqcCheckTable
                    {...this.getDefaultTableProps()}
                    scrollY={200} 
                    pagination={false} 
                    ref = {(orderTable) => { this.orderTable = orderTable }} 
                    iqcTable = {this.iqcTable}
                    resetData = {this.resetData}
        />
    }
  
    buildOtherComponent = () => {
        return <IqcCheckScanProperties
                    tableRrn = {this.state.parameterTabRrn}  
                    orderTable = {this.orderTable} 
                    resetFlag = {this.state.resetFlag} 
                    ref = {(iqcTable) => { this.iqcTable = iqcTable }}  
        />
    }
  
}