import VcFinishGoodReceiveRequest from "@api/vc/finishGood-manager/receive/VcFinishGoodReceiveRequest";
import IncomingMaterialReceiveScanTable from "@components/mms/table/IncomingMaterialReceiveScanTable";
import NoticeUtils from "@utils/NoticeUtils";


/**
 * 接收
 */
export default class VcFinishGoodReceiveScanTable extends IncomingMaterialReceiveScanTable {

    static displayName = 'VcFinishGoodReceiveScanTable';

    receive = () => {
        let self = this;
        let materialLots = this.getScanedRows();
        let doc = this.props.orderTable.getSingleSelectedRow();
        if (materialLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLotList: materialLots,
            documentId: doc.name,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.setState({
                        loading: false
                    });
                    self.props.resetData();
                    self.props.onSearch();
                }
                NoticeUtils.showSuccess();
            }
        }
        VcFinishGoodReceiveRequest.sendReceiveFinishGoodRequest(requestObject);
    }

}