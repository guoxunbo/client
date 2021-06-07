import IssueOrderRequest from "@api/issue-order-manager/issue-lot-order/IssueOrderRequest";
import MobileTable from "@components/framework/table/MobileTable";
import {WrappedIssueMLotByOrderForm} from "@components/mms/form/mobile/IssueMLotByOrderForm";
import { i18NCode } from "@const/i18n";
import MobileProperties from "@properties/framework/MobileProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

export default class IssueMLotByOrderProperties extends MobileProperties{

    static displayName = 'IssueMLotByOrderProperties';
    
    buildMobileForm = () => {
        return (<WrappedIssueMLotByOrderForm 
                    ref={(form) => this.mobileForm = form} 
                    wrappedComponentRef={(form) => this.form = form}
                    dataTable={this.dataTable}
                    tableRrn={this.state.tableRrn} 
                    table={this.state.table}/>);
    }

    buildTable = () => {
        return <MobileTable ref={(dataTable) => { this.dataTable = dataTable }} {...this.getDefaultTableProps()} tableRrn={this.state.tableRrn} pagination={false} showScanedQtyFlag= {true}/>
    }

    handleSubmit = () => {
        let self = this;
        let materialLots = this.dataTable.getScanedRows();
        if (materialLots.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let value = this.mobileForm.getFieldsValue();
        let requestObject = {
            materialLots: materialLots,
            documentId: value.docId,
            success: function(responseBody) {
                self.handleReset();
                NoticeUtils.mobileShowSuccess(undefined, 'bottomRight');
            }
        }
        IssueOrderRequest.sendIssueMLotByDocRequest(requestObject);
    }
        
}
