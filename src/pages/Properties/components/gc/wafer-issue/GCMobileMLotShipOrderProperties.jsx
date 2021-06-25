import MobileProperties from "../../mobile/MobileProperties";
import GCMobileMLotShipScanProperties from "./GCMobileMLotShipScanProperties";
import MobileMLotShipOrderTable from "../../../../../components/Table/gc/MobileMLotShipOrderTable";

export default class GCMobileMLotShipOrderProperties extends MobileProperties{

    static displayName = 'GCMobileMLotShipOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    buildTable = () => {
        return <MobileMLotShipOrderTable ref={(orderTable) => { this.orderTable = orderTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

    buildProperties = () => {
        return (<GCMobileMLotShipScanProperties
                  ref={(orderProperties) => this.orderProperties = orderProperties} 
                  orderTable={this.orderTable}
                  tableRrn={this.state.parameters.parameter1}/>);
    }
    
    render() {
      return (
        <div className="properties-page">
          <div className="router-body">
            {this.buildOtherComponent()}
            {this.buildTable()}
            {this.buildProperties()}
          </div>
        </div>
      );
    }
}