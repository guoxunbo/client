import EntityForm from './EntityForm';
import VboxHoldSetManagerRequest from '../../api/gc/vbox-hold-manager/VboxHoldSetManagerRequest';
import { Notification } from '../notice/Notice';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';

export default class VBoxHoldSetForm extends EntityForm {
    static displayName = 'VBoxHoldSetForm';

    handleSave = () => {
        var self = this;
        let workorderRelation = this.props.object;
        let workorderId = workorderRelation.workOrderId;
        let grade = workorderRelation.grade;
        if((workorderId == null || workorderId == "" || workorderId == undefined) && (grade == "" || grade == null || grade == undefined)){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.WorkorderIdAndGradeCanEmpty));
            return;
        }
        let object = {
            workorderRelation: workorderRelation,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.workorderRelation);
                }
            }
        };
        VboxHoldSetManagerRequest.sendMergeRequest(object);
    }
}


