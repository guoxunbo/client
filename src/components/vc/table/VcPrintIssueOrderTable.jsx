import { Button } from "@alifd/next";
import IssueOrderRequest from "@api/issue-order-manager/issue-lot-order/IssueOrderRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import PrintIssueOrderDialog from "@components/mms/dialog/PrintIssueOrderDialog";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";

/**
 * 打印发料单
 */
export default class VcPrintIssueOrderTable extends EntityListTable {

    static displayName = 'VcPrintIssueOrderTable';

    createButtonGroup = () => {
        return (<Button key="printPKList" type="primary" className="table-button" onClick={this.handlePrint}>
                    {IconUtils.buildIcon("file-excel")} {I18NUtils.getClientMessage(i18NCode.BtnPrint)}
                </Button>)
    }

    handlePrint = () =>{
        let self = this ;
        let materialLots = self.state.data;
        let document = self.props.document;
        self.setState({
            document: document,
            formObject: materialLots,
            formVisible: true
        });
    }

    createForm = () => {
        return  <PrintIssueOrderDialog
                        key={PrintIssueOrderDialog.displayName} 
                        ref={this.formRef} 
                        document={this.state.document}
                        object={this.state.formObject} 
                        visible={this.state.formVisible} 
                        onOk={this.refresh} 
                        onCancel={this.handleCancel} />
    }

    refresh = (data) => {
        this.setState({
            formObject: [],
            formVisible: false
        });
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}