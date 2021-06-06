import IssueOrderByMaterialRequest from '@api/issue-order-manager/issue-order-by-material/IssueOrderByMaterialRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button, Tag } from 'antd';
import PrintIssueOrderDialog from '../dialog/PrintIssueOrderDialog';

export default class IssueByMaterialOrderScanTable extends EntityScanViewTable {

    static displayName = 'IssueByMaterialOrderScanTable';

    constructor(props){
        super(props);
        this.state = {...this.state, formPrintObject:{}, documentId:'', formVisible: false};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createIssueLabLotButton());
        return buttons;
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }
  

    createIssueLabLotButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.IssueLabLot}>
                        {I18NUtils.getClientMessage(i18NCode.Issue)}
                    </Button>
    }

    IssueLabLot = () => {
        let self = this;
        let {data} = self.state;
        let document = self.props.orderTable.getSingleSelectedRow();
        if (data.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        let objectRequest = {
            documentId: document.name,
            materialLots: data,
            success: function(){
                self.setState({
                    formPrintObject: data,
                    documentId: document.name,
                    formVisible: true,
                })
                self.setState({
                    loading: false
                });
                self.props.resetData();

                NoticeUtils.showSuccess();
            }
        }
        IssueOrderByMaterialRequest.sendIssueMaterialRequest(objectRequest);

    }

    createForm = () => {
        let childrens = [];
        childrens.push(<PrintIssueOrderDialog key={PrintIssueOrderDialog.displayName} ref={this.formRef} object={this.state.formPrintObject} documentId = {this.state.documentId} visible={this.state.formVisible} 
                                                         onOk={this.handleCancel} onCancel={this.handleCancel} />);                               
        return childrens;
    }

    handleCancel = ()=>{
        this.setState({
            formPrintObject: {},
            formVisible: false,
            documentId: []
        })
    }

     
    buildOperationColumn = () => {
        
    }
    
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};