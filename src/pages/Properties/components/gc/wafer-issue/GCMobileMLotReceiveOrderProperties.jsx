import MobileProperties from "../../mobile/MobileProperties";
import GCMobileMLotReceiveByOrderProperties from "./GCMobileMLotReceiveByOrderProperties";
import MobileCobMLotReceiveOrderTable from "../../../../../components/Table/gc/MobileCobMLotReceiveOrderTable";
import { WrappedAdvancedMobileForm } from "../../../../../components/Form/MobileForm";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";

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
                  onSearch={this.handleSearch.bind(this)}
                  wrappedComponentRef={(form) => this.form = form} 
                  />);
  }

    buildTable = () => {
      return <MobileCobMLotReceiveOrderTable ref={(dataTable) => { this.dataTable = dataTable }} 
                                             table={this.state.table} 
                                             data={this.state.tableData} 
                                             queryFrom={this.form}
                                             loading={this.state.loading} />
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