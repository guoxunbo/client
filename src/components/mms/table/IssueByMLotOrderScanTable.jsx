import IssueOrderRequest from '@api/issue-order-manager/issue-lot-order/IssueOrderRequest';
import IssueOrderByMaterialRequest from '@api/issue-order-manager/issue-order-by-material/IssueOrderByMaterialRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button, Tag } from 'antd';

export default class IssueByMLotOrderScanTable extends EntityScanViewTable {

    static displayName = 'IssueByMLotOrderScanTable';

    constructor(props){
        super(props);
        this.state = {...this.state, formPrintObject:{}, documentId:'', formVisible: false};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createIssueMLotButton());
        return buttons;
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5" style={styles.tableButton} >{I18NUtils.getClientMessage(i18NCode.Qty)}：{this.state.data.length}</Tag>
    }
  

    createIssueMLotButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="file-excel" onClick={this.IssueMLot}>
                        {I18NUtils.getClientMessage(i18NCode.Issue)}
                    </Button>
    }

    IssueMLot = () => {
        let self = this;
        let {data} = self.state;
        if (data.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let document = self.props.orderTable.getSingleSelectedRow();
        if (document == undefined) {
            return;
        }

        let objectRequest = {
            documentId: document.name,
            materialLots: data,
            success: function(){
                self.setState({
                    loading: false
                });
                self.props.resetData();
                NoticeUtils.showSuccess();
            }
        }
        IssueOrderRequest.sendIssueMaterialLotByOrderRequest(objectRequest);

    }
     
    buildOperationColumn = () => {
        
    }
    
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};