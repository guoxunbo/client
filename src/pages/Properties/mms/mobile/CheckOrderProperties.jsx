import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import { WrappedCheckOrderForm } from "@components/mms/form/mobile/CheckOrderForm";
import CheckOrderTable from "@components/mms/table/mobile/CheckOrderTable";
import MobileProperties from "@properties/framework/MobileProperties";
import CheckMLotProperties from "./CheckMLotProperties";

export default class CheckOrderProperties extends MobileProperties{

    static displayName = 'CheckOrderProperties';
    
    buildTable = () => {
        return <CheckOrderTable
                    ref={(dataTable) => { this.dataTable = dataTable }} 
                    {...this.getDefaultTableProps()}  
                    tableRrn={this.state.tableRrn} 
                    scanProperties = {this.scanProperties}
                    pagination={true} />
    }

    buildMobileForm = () => {
        return (<WrappedCheckOrderForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    onSearch = () => {
        this.form.handleSearch();
    }

    buildProperties = () => {
        return (<CheckMLotProperties
                    ref={(scanProperties) => this.scanProperties = scanProperties} 
                    dataTable = {this.dataTable}
                    handleReset = {this.handleReset}
                    onSearch = {this.onSearch.bind(this)}
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
