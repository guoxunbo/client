import VcStockOutRequest from "@api/vc/stock-out-manager/VcStockOutRequest";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedShipMLotForm } from "@components/mms/form/mobile/ShipOutMLotForm";
import { WrappedShipOutOrderForm } from "@components/mms/form/mobile/ShipOutOrderForm";
import ShipOutOrderTable from "@components/mms/table/mobile/ShipOutOrderTable";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import ShipOutMLotProperties from "./ShipOutMLotProperties";

/**
 * 发货单据信息
 */
export default class ShipOutOrderProperties extends MobileProperties{

    static displayName = 'ShipOutOrderProperties';
    
    buildMobileForm = () => {
        return (<WrappedShipOutOrderForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    handleSubmit = {this.handleSubmit}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <ShipOutOrderTable ref={(dataTable) => { this.dataTable = dataTable }} 
                            {...this.getDefaultTableProps()}  tableRrn={this.state.tableRrn} 
                            pagination={false} 
                            orderProperties = {this.orderProperties}
                            showScanedQtyFlag = {true}/>
    }

    buildProperties = () => {
        return (<ShipOutMLotProperties
                    ref={(orderProperties) => this.orderProperties = orderProperties}
                    dataTable = {this.dataTable}
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
