import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateReturnTable from './CreateReturnTable';

/**
 * 创建部门退料单
 */
export default class CreateDeptReturnTable extends CreateReturnTable {

    static displayName = 'CreateDeptReturnTable';

    CreateReturnOrder = () =>{
        let self = this ;
        let {data} = self.state;
        if(data.length == 0){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let nullReturnQtyFlag = false;
        data.map((d, index)=>{
            if(d.transQty == null){
                nullReturnQtyFlag = true;
            }
        })

        if(nullReturnQtyFlag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage("退料数量不能为空"));
            return;
        }
        let objectRequest = {
            materialLots: data,
            success: function(responseBody){
                self.setState({
                    formPrintVisible: true,
                    formPrintObject:data,
                    documentId:responseBody.document.name,
                })
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        ReturnLotOrderRequest.sendCreateDeptReturnOrderRequest(objectRequest);
    }
}