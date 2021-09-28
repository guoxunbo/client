import MaterialLotIqcRequest from '@api/mms/material-lot-iqc/MaterialLotIqcRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { WrappedMLotBatchJudgeIqcFrom } from '../form/MLotBatchJudgeIqcFrom';

/**
 * 批量判定IQC的弹框
 */
export default class MLotBatchJudgeIqcDialog extends EntityDialog {
    static displayName = 'MLotBatchJudgeIqcDialog';

    handleSave = () => {
        let self = this;
        let editorTable = self.batchJudgeIqcFrom.wrappedComponentEditorTable;
        let {data} = editorTable.state;
        debugger;
        let materialLots = this.props.object.materialLots;
        let noticeFlag = false;
        if (materialLots.length > 1) {
            for (let index = 1; index < materialLots.length; index++) {
                if(materialLots[index].materialName != materialLots[index-1].materialName){
                    noticeFlag = true;
                }
            }
            if(noticeFlag){
                NoticeUtils.showInfo(I18NUtils.getClientMessage("物料代码不一致"));
                return;
            }
        }

        let object = {
            judgeMLotAndAction: self.props.object,
            materialLots: self.props.object.materialLots,
            checkSheetLines: data,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        MaterialLotIqcRequest.sendBatchIqcRequest(object);
    }

    buildForm = () => {
        let materialLotQc = this.props.materialLotQc;
        if(!materialLotQc){
            return;
        }
        return <WrappedMLotBatchJudgeIqcFrom 
                        ref={(form) => this.entityForm = form} 
                        wrappedComponentRef={(form) => this.batchJudgeIqcFrom  = form}
                        tableRrn={this.props.tableRrn} 
                        object={this.props.object} 
                        table={this.props.table}
                        materialLotQcObject={materialLotQc.state.formObject}
                        entityViewFlag={true}/>
    }
}

 
