
import CheckMLotRequest from '@api/vc/check-mlot-manager/CheckMLotRequest';
import { Button, Modal } from 'antd';
import AuthorityButton from '@components/framework/button/AuthorityButton';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@api/utils/I18NUtils';
import IconUtils from '@utils/IconUtils';
import NoticeUtils from '@utils/NoticeUtils';
import EntityListTable from '@components/framework/table/EntityListTable';

const HandleType = {
    Check: "Check",
    Recheck: "Recheck",
}
export default class VcCheckByOrderScanTable extends EntityListTable {

    static displayName = 'VcCheckByOrderScanTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        }if (record.scaned) {
            return 'scaned-row';
        }else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createERPButton());
        buttons.push(this.createCheckButton());
        buttons.push(this.createRecheckButton());
        return buttons;
    }

    createCheckButton = () => {
        return <AuthorityButton key="CheckMLotBtn" 
                    name="CheckMLotBtn" 
                    type="primary" 
                    className="table-button" 
                    icon="icon-pandian"
                    loading = {this.state.loading}
                    i18NCode={i18NCode.BtnCheckMLot} 
                    onClick={() => this.handleCheck()} disabled = {true}/>
    }

    /**
     * 直接把库存数据抛送给ERP
     * @returns 
     */
    createERPButton = () => {
        return <AuthorityButton key="SendMLotInvERPBtn" 
                    name="SendMLotInvERPBtn" 
                    type="primary" 
                    className="table-button" 
                    icon="icon-pandian"
                    loading = {this.state.loading}
                    i18NCode={"ERP"} 
                    onClick={() => this.handleERP()} disabled = {true}/>
    }

    handleERP = () => {
        let self = this;
        let documentLine = self.props.orderTable.getSingleSelectedRow();
        if (!documentLine) return;

        let {data} = self.state;
        let requestObject = {
            documentLine: documentLine,
            materialLots: data,
            success: function() {
                self.props.onSearch();     
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        CheckMLotRequest.sendMLotInfoRequest(requestObject);
    }

    handleCheck = () => {
        let self = this;
        let {data} = self.state;
        let scanedMaterialLots = data.filter((d) => d.scaned && d.scaned === true);
        if(scanedMaterialLots.length != data.length){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseScanAll));
            return;
        }
        let documentLine = self.props.orderTable.getSingleSelectedRow();
        if (!documentLine) return;
      
        if (documentLine.status && documentLine.status != 'Approve'){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.CannotCheck))
            return;
        }
        self.setState({loading: true});
        let errorMLots = data.filter((d) => d.errorFlag && d.errorFlag === true);
        if(errorMLots.length > 0){
            this.buildModal(() => this.handleOkFunc(documentLine, scanedMaterialLots, HandleType.Check));
        }else{
            this.handleOkFunc(documentLine, scanedMaterialLots, HandleType.Check)
        }
    }

    buildModal = (onOkFunc) =>{
        let self = this;
        Modal.confirm({
            title: 'Confirm',
            content: I18NUtils.getClientMessage("当前数量和扫描数量不一致"),
            okText: I18NUtils.getClientMessage(i18NCode.Confirm),
            cancelText: I18NUtils.getClientMessage(i18NCode.Cancel),
            onOk:() => { onOkFunc() },
            onCancel:()=>{ self.setState({loading: false}) }
        });
    }

    handleOkFunc = (documentLine, scanedMaterialLots, handleType) => {
        let self = this;
        let requestObject = {
            documentLine: documentLine,
            materialLots: scanedMaterialLots,
            success: function() {
                self.props.onSearch();
                self.refreshDelete(scanedMaterialLots);
                self.setState({ loading: false });
            }
        }
        if(HandleType.Check == handleType){
            CheckMLotRequest.sendCheckMLotByOrderRequest(requestObject);
        }else if(HandleType.Recheck == handleType){
            CheckMLotRequest.sendRecheckMLotByOrderRequest(requestObject);
        }
    }

    createRecheckButton = () => {
        return <AuthorityButton key="ReCheckMLotBtn" 
                    name="ReCheckMLotBtn" 
                    type="primary" 
                    className="table-button" 
                    icon="icon-pandian"
                    i18NCode={i18NCode.BtnRecheckMLot} 
                    loading = {this.state.loading}
                    onClick={() => this.handleRecheck()} disabled = {true}/>
    }

    handleRecheck = () => {
        let self = this;
        let {data} = self.state;
        let scanedMLots = data.filter((d) => d.scaned && d.scaned === true);
        if(scanedMLots.length != data.length){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseScanAll));
            return;
        }
        let documentLine = self.props.orderTable.getSingleSelectedRow();
        if(!documentLine) return; 
        
        if (documentLine.status && documentLine.status != 'WaitRecheck'){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.CannotReCheck))
            return 
        }
        self.setState({loading:true})
        let errorMLots = data.filter((d) => d.errorFlag && d.errorFlag === true);
        if(errorMLots.length > 0){
            this.buildModal(() => this.handleOkFunc(documentLine, scanedMLots, HandleType.Recheck));
        }else{
            this.handleOkFunc(documentLine, scanedMLots, HandleType.Recheck)
        }
    }

    buildOperationColumn = () => {
    
    }
}