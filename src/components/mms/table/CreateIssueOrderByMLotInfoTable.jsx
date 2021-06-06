import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintIssueOrderDialog from '../dialog/PrintIssueOrderDialog';
import CreateIssueOrderByMaterialInfoTable from './CreateIssueOrderByMaterialInfoTable';

/**
 * 创建指定批次及数量发料单
 */
export default class CreateIssueOrderByMLotInfoTable extends CreateIssueOrderByMaterialInfoTable {

    static displayName = 'CreateIssueOrderByMLotInfoTable';

    constructor(props){
        super(props);
        this.state = {...this.state, document:[]};
    }

    handleCreatePick = () =>{
        let self = this ;
        let {data} = self.state;
        if(data.length == 0){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }
        let nullPickQtyFlag = false;
        data.map((d, index)=>{
            if(d.pickQty == null){
                nullPickQtyFlag = true;
            }
        })

        if(nullPickQtyFlag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage("领料数量不能为空"));
            return;
        }
        let objectRequest = {
            materialLots : data,
            success: function(responseBody){
                self.setState({
                    formPrintVisible: true,
                    formPrintObject:data,
                    document:responseBody.document,
                })
            }
        }
        IssueOrderRequest.sendCreateIssueMLotOrderRequest(objectRequest);
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<CreateMLotDialog key={CreateMLotDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);                               
        childrens.push(<PrintIssueOrderDialog key={PrintIssueOrderDialog.displayName} document={this.state.document} object={this.state.formPrintObject} 
                                            visible={this.state.formPrintVisible} onOk={this.printOk} onCancel={this.printCancel}/>
            )
        return childrens;
    }

}