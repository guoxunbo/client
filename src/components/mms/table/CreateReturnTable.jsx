import { Button } from '@alifd/next';
import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintReturnOrderDialog from '../dialog/PrintReturnOrderDialog';

/**
 * 创建退料单 仓库退到供应商
 */
export default class CreateReturnTable extends EntityListTable {

    static displayName = 'CreateReturnTable';

    constructor(props){
        super(props);
        this.state = {...this.state, documentId:'', formPrintObject:{}, document:[], formPrintVisible:false};
    }

    createButtonGroup = () => {
        return(<Button key="CreatePickOrder" type="primary" loading={this.state.loading} icon ="file-excel" onClick={this.CreateReturnOrder}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCreate)}
                </Button>)
    }

    CreateReturnOrder = () =>{
        let self = this ;
        let {data} = self.state;
        let nullReturnQtyFlag = false;
        data.map((d, index)=>{
            if(d.reservedQty == null){
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
        ReturnLotOrderRequest.sendCreateReturnOrder(objectRequest);
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<CreateMLotDialog key={CreateMLotDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);                               
        childrens.push(<PrintReturnOrderDialog key={PrintReturnOrderDialog.displayName} documentId={this.state.documentId} object={this.state.formPrintObject} 
                                            visible={this.state.formPrintVisible} onOk={this.printOk} onCancel={this.printOk}/>
            )
        return childrens;
    }

    printOk = () => {
        this.setState({
            formPrintVisible: false,
            formPrintObject:{},
            document:[]
        });

        this.props.resetData();
        NoticeUtils.showSuccess();
    }
}