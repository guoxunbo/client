import { Button } from '@alifd/next';
import MaterialLotJudgeAction from '@api/dto/mms/MaterialLotJudgeAction';
import IqcCheckRequest from '@api/iqc-manager/IqcCheckRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18Messages, i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';

export default class IqcCheckScanTable extends EntityListTable{

    static displayName = 'IqcCheckScanTable';

    createButtonGroup = () =>{
        let buttons = [];
        buttons.push(this.createBtnNG());
        buttons.push(this.createBtnOK());
        return buttons;
    }

    createBtnNG = () => {
        return <Button key="NG" style={styles.tableButton} type="primary" className="table-button" icon="file-excel" onClick={this.judgeResultNG }>
                        {I18NUtils.getClientMessage("NG")}
                    </Button>
    }

    createBtnOK = () => {
        return <Button key="OK" style={styles.tableButton} type="primary" className="table-button" icon="file-excel" onClick={this.judgeResultOK }>
                        {I18NUtils.getClientMessage("OK")}
                    </Button>
    }

    judgeResultOK = () => {
        let self = this ;
        let data = self.state.data;
        let checkSheet = this.props.orderTable.getSingleSelectedRow();
        if(!checkSheet){
            NoticeUtils.showNotice(i18NCode.SelectAtLeastOneRow);
            return;
        }
        if(!data){
            NoticeUtils.showNotice("检查明细为空");
            return;
        }
        let flag = false;
        data.forEach(d =>{
            if(!d.checkResult){
                flag = true;
                return;
            }  
        })
        if(flag){
            NoticeUtils.showNotice("检查结果为空");
            return;
        }
        let object = {
            judgeResult: "OK",
            materialLotId: checkSheet.materialLotId,
            success: function(responseBody) {
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        IqcCheckRequest.sendIqcCheckRequest(object);
    }

    judgeResultNG = () => {
        let self = this ;
        let data = self.state.data;
        let checkSheet = this.props.orderTable.getSingleSelectedRow();
        if(!checkSheet){
            NoticeUtils.showNotice(i18NCode.SelectAtLeastOneRow);
            return;
        }
        if(!data){
            NoticeUtils.showNotice("检查明细为空");
            return;
        }
        let flag = false;
        data.forEach(d =>{
            if(!d.checkResult){
                flag = true;
                return;
            }  

        })
        if(flag){
            NoticeUtils.showNotice("检查结果为空");
            return;
        }
      
        let object = {
            judgeResult: "NG",
            materialLotId: checkSheet.materialLotId,
            success: function(responseBody) {
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        IqcCheckRequest.sendIqcCheckRequest(object);
    }

    /**
     * 重定义编辑操作
     */
    // buildOperationColumn = () => {
        
    // }
}
const styles = {
    tableButton: {
        marginLeft:'40px',
        width:'80px'
    }
};