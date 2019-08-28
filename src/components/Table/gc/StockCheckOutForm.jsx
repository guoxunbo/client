import EntityForm from "../../Form/EntityForm";
import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";

export default class StockCheckOutForm extends EntityForm {
    static displayName = 'StockCheckOutForm';

    buildBasicSection = () => {
        
    }
    
    handleSave = (formObject) => {
        var self = this;
        let packedLotDetails = this.props.object;
        let object = {
            packedLotDetails : packedLotDetails,
            judgeGrade: formObject.judgeGrade,
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


