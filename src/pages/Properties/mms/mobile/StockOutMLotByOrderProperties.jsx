import MobileRequest from "@api/mobile/mobile-request-manager/MobileRequest";
import MobileTable from "@components/framework/table/MobileTable";
import { WrappedStockOutMLotByOrderForm } from "@components/mms/form/mobile/StockOutMLotByOrderForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 物料批次出库绑定单据,适用于推荐物料批次发料的单据
 */
export default class StockOutMLotByOrderProperties extends MobileProperties{

    static displayName = 'StockOutMLotByOrderProperties';
    
    buildMobileForm = () => {
        return (<WrappedStockOutMLotByOrderForm 
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
        if (materialLots.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            documentId: value.docId,
            materialLots: materialLots,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');

            }
        }
        MobileRequest.sendStockOutByOrderRequest(requestObject);
    }

}
