import { Notification } from "../../../../../components/notice/Notice";
import I18NUtils from "../../../../../api/utils/I18NUtils";
import { i18NCode } from "../../../../../api/const/i18n";
import MobileProperties from "../../mobile/MobileProperties";
import FinishGoodInvManagerRequest from "../../../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest";
import MessageUtils from "../../../../../api/utils/MessageUtils";

export default class GCMobileReceiveFGProperties extends MobileProperties{

    static displayName = 'GcCOMWaferIssueMLotUnitScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, rowKey: "packedLotRrn"};
    }
    
    handleSubmit = () => {
      console.log(this.state.tableData);
      const {tableData} = this.state;
      let self = this;
      if (!tableData || tableData.length == 0) {
          Notification.showError(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
          return;
      }
      let materialLots = tableData;
      if (materialLots && materialLots.length > 0) {
          let requestObject = {
              mesPackedLots: materialLots,
              success: function(responseBody) {
                  self.handleReset();
                  MessageUtils.showOperationSuccess();
              }
          }
          FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
      }
    }
    
}