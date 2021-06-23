import MobileProperties from "../../mobile/MobileProperties";
import GCMobileMLotReceiveByOrderProperties from "./GCMobileMLotReceiveByOrderProperties";

export default class GCMobileMLotReceiveOrderProperties extends MobileProperties{

    static displayName = 'GCMobileMLotReceiveOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    buildProperties = () => {
      return (<GCMobileMLotReceiveByOrderProperties
                  ref={(orderProperties) => this.orderProperties = orderProperties} 
                  orders={this.state.tableData}
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