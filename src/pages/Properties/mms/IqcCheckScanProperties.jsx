import IqcCheckScanTable from "@components/mms/table/IqcCheckScanTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

export default class IqcCheckScanProperties extends EntityScanProperties{

    static displayName = 'IqcCheckScanProperties';
    
    constructor(props) {
        super(props);
        this.state= {...this.state, ...{showQueryFormButton: false}}
    }

    componentWillReceiveProps = (props) => {
        const {resetFlag} = props;
        if (resetFlag) {
           this.form.handleReset();
        }
    }

    resetOrderData = (orderTable) => {
        orderTable.setState({
          data: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <IqcCheckScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}  
                          />
    }
}