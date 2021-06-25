import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import MessageUtils from "../../../../../api/utils/MessageUtils";
import MobileMLotReceiveTable from "../../../../../components/Table/gc/MobileMLotReceiveTable";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";

export default class GCMobileMLotReceiveByOrderProperties extends MobileProperties{

    static displayName = 'GCMobileMLotReceiveByOrderProperties';
    
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
            receiveWithDoc: "receiveWithDoc",
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                }
                self.handleReset();
                MessageUtils.showOperationSuccess();
            }
        }
        WaferManagerRequest.sendReceiveWaferRequest(requestObject);
    }

    buildTable = () => {
        return <MobileMLotReceiveTable ref={(dataTable) => { this.dataTable = dataTable }}  table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }
}