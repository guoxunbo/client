import MobileProperties from "../../mobile/MobileProperties";
import GCMobileMLotIssueByOrderProperties from "./GCMobileMLotIssueByOrderProperties";

export default class GCMobileMLotIssueOrderProperties extends MobileProperties{

    static displayName = 'GCMobileMLotIssueOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    buildProperties = () => {
      return (<GCMobileMLotIssueByOrderProperties
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