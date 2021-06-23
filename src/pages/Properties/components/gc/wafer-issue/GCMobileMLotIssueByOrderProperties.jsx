import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MobileMLotIssueTable from "../../../../../components/Table/gc/MobileMLotIssueTable";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";

export default class GCMobileMLotIssueByOrderProperties extends MobileProperties{

    static displayName = 'GCMobileMLotIssueByOrderProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "objectRrn"};
    }
    
    handleSubmit = () => {
        const {tableData} = this.state;
        let self = this; 
        if (!tableData || tableData.length == 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let orders = this.props.orders;
        if (orders.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }

        let requestObject = {
            documentLines : orders,
            materialLots : tableData,
            issueWithDoc: "issueWithDoc",
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        WaferManagerRequest.sendWaferIssueRequest(requestObject);
    }

    buildTable = () => {
        return <MobileMLotIssueTable ref={(dataTable) => { this.dataTable = dataTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }
}