import VcStockOutRequest from "@api/vc/stock-out-manager/VcStockOutRequest";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedShipMLotForm } from "@components/mms/form/mobile/ShipOutMLotForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 发货
 */
export default class ShipOutMLotProperties extends MobileProperties{

    static displayName = 'ShipOutMLotProperties';
    
    buildMobileForm = () => {
        return (<WrappedShipMLotForm
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    handleSubmit = {this.handleSubmit}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()}  tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag = {true}/>
    }

    handleSubmit = () => {
        let self = this;
        let value = this.mobileForm.getFieldsValue();
        let materialLots = this.dataTable.getScanedRows();
        if(materialLots.length == 0){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.PleaseScanOneMLot))
            return;
        }
        
        let requestObject = {
            docLineId: value.docId,
            materialLots: materialLots,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');       
            }
        }
        VcStockOutRequest.sendStockOutRequest(requestObject);
    }

}
