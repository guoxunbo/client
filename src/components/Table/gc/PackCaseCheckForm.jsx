import EntityForm from "../../Form/EntityForm";
import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";
import { JudgeGrade } from "../../../api/gc/material-lot-manager/MaterialLotManagerRequestBody";

export default class PackCaseCheckForm extends EntityForm {
    static displayName = 'PackCaseCheckForm';

    handleSave = (formObject) => {
        var self = this;
        let packedLotDetails = this.props.object;
        let object = {
            packedLotDetails : packedLotDetails,
            judgeGrade: JudgeGrade.Ng,
            judgeCode: formObject.judgeCode,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotManagerRequest.sendJudgePackedMaterialLotRequest(object);
    }

}


