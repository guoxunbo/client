import MobileProperties from "../../mobile/MobileProperties";
import GCMobileMLotShipScanProperties from "./GCMobileMLotShipScanProperties";
import MobileMLotShipOrderTable from "../../../../../components/Table/gc/MobileMLotShipOrderTable";
import { WrappedAdvancedMobileForm } from "../../../../../components/Form/MobileForm";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";

export default class GCMobileMLotShipOrderProperties extends MobileProperties{

    static displayName = 'GCMobileMLotShipOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }

    queryData = (whereClause) => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        whereClause: whereClause,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            loading: false
          });
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildMobileForm = () => {
      return (<WrappedAdvancedMobileForm
                  ref={(form) => this.mobileForm = form} 
                  tableRrn={this.state.tableRrn} 
                  table={this.state.table}
                  onSearch={this.queryData.bind(this)}
                  wrappedComponentRef={(form) => this.form = form} 
                  />);
    }

    buildTable = () => {
        return <MobileMLotShipOrderTable ref={(orderTable) => { this.orderTable = orderTable }}  
                                         table={this.state.table} 
                                         queryFrom={this.form}
                                         data={this.state.tableData} 
                                         loading={this.state.loading} />
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