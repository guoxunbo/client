import MaterialLotAction from '@api/dto/mms/MaterialLotAction';
import PackCheckRequest from '@api/pack-check/PackCheckRequest';
import UpdateMLotRequest from '@api/vc/update-mlot-manager/UpdateMLotRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';

/**
 * 添加RMA号码
 */
export default class VcAddRmaNoDialog extends EntityDialog {

    static displayName = 'VcAddRmaNoDialog';

    handleSave = () => {
        debugger;
        var self = this;
        let objectData = self.props.object;
        let {materialLots} = self.props.object;
        let mLotAction = new MaterialLotAction();
        mLotAction.setActionCode(objectData.actionCode);
        mLotAction.setActionReason(objectData.actionReason);
        mLotAction.setActionComment(objectData.actionComment);
        let object = {
            materialLotAction: mLotAction,
            materialLotList: materialLots,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.materialLotList);
                }
            }
        }
        UpdateMLotRequest.sentAddRmaNoRequest(object);
    }
}

 
