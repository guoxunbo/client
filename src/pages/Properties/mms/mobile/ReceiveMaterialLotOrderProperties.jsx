import { WrappedReceiveMaterialLotByOrderForm } from "@components/mms/form/mobile/ReceiveMaterialLotByOrderForm";
import { WrappedReceiveMLotByOrderForm } from "@components/mms/form/mobile/ReceiveMLotByOrderForm";
import ReceiveMaterialLotOrderTable from "@components/mms/table/mobile/ReceiveMaterialLotOrderTable";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import ReceiveMaterialLotByOrderProperties from "./ReceiveMaterialLotByOrderProperties";


export default class ReceiveMaterialLotOrderProperties extends MobileProperties{

    static displayName = 'ReceiveMaterialLotOrderProperties';

    buildTable = () => {
        return <ReceiveMaterialLotOrderTable 
                    ref={(dataTable) => { this.dataTable = dataTable }} 
                    {...this.getDefaultTableProps()}  
                    tableRrn={this.state.tableRrn} 
                    orderProperties = {this.orderProperties}
                    pagination={true} />
    }

    buildMobileForm = () => {
        return (<WrappedReceiveMaterialLotByOrderForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildProperties = () => {
        return (<ReceiveMaterialLotByOrderProperties
                    ref={(orderProperties) => this.orderProperties = orderProperties} 
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
