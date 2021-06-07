import MaterialLotAction from '@api/dto/mms/MaterialLotAction';
import PackCheckRequest from '@api/pack-check/PackCheckRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * 装箱检验 NG的弹出框
 */
const ActionCode = {
    NG: "NG"
}
export default class VcPackCheckDialog extends EntityDialog {

    static displayName = 'VcPackCheckDialog';

    handleSave = () => {
        var self = this;
        let objectData = self.props.object;
        let materialLots = self.props.materialLots;
        let packCheckAction = new MaterialLotAction();
        packCheckAction.setMaterialLotId(materialLots[0].boxMaterialLotId);
        packCheckAction.setActionCode(ActionCode.NG);
        packCheckAction.setActionReason(objectData.actionReason);
        packCheckAction.setActionComment(objectData.actionComment);
        let object = {
            packCheckAction: packCheckAction,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        PackCheckRequest.sendPackCheckRequest(object);
    }
}

 
