import MaterialLotManagerRequest from "../../../api/gc/material-lot-manager/MaterialLotManagerRequest";
import { JudgeGrade } from "../../../api/gc/material-lot-manager/MaterialLotManagerRequestBody";
import CheckItemForm from "./CheckItemForm";


export default class PackCaseCheckForm extends CheckItemForm {
    static displayName = 'PackCaseCheckForm';

    judge = () => {
        debugger;
        let self = this;
        let object = {
            packedLotDetails : this.props.object,
            checkList: this.editorColumnTable.state.dataSource,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotManagerRequest.sendJudgePackedMaterialLotRequest(object);
    }

}


