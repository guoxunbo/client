import IssueOrderByMaterialRequest from '@api/issue-order-manager/issue-order-by-material/IssueOrderByMaterialRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button } from 'antd';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintPickOrderDialog from '../dialog/PrintPickOrderDialog';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import CreateIssueOrderDialog from '../dialog/CreateIssueOrderDialog';
import TableUtils from '@components/framework/utils/TableUtils';


export default class CreateIssueOrderByMaterialInfoTable extends EntityListTable {

    static displayName = 'CreateIssueOrderByMaterialInfoTable';

    constructor(props){
        super(props);
        this.state = {...this.state, formPrintObject:{}, document:{}, formPrintVisible:false };
    }

    createButtonGroup = () => {
        return(<Button key="CreatePickOrder" type="primary" loading={this.state.loading} icon="file-excel" onClick={this.handleCreatePick}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCreate)}
                </Button>)
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

        this.openCreateIssueOrderDialog(data);
    }
    
    openCreateIssueOrderDialog = (dataList) => {
        let self = this;
        let requestObject = {
            name: this.props.createDeptIssueActionTableName, 
            success: function(responseBody) {
                self.setState({
                    createIssueOrderObject: {materials: dataList},
                    createIssueOrderVisible: true,
                    createIssueOrderActionTable: responseBody.table
                });  
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject); 
    }

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

    handleDelete = (record) => {
        this.refreshDelete(record);
    } 

    
    createForm = () => {
        let childrens = [];
        childrens.push(<CreateMLotDialog key={CreateMLotDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);                               
        childrens.push(<PrintPickOrderDialog key={PrintPickOrderDialog.displayName} document={this.state.document} object={this.state.formPrintObject} 
                                            visible={this.state.formPrintVisible} onOk={this.printOk} onCancel={this.printCancel}/>)
        childrens.push(<CreateIssueOrderDialog key={CreateIssueOrderDialog.displayName} object={this.state.createIssueOrderObject}  table={this.state.createIssueOrderActionTable} 
                visible={this.state.createIssueOrderVisible} onOk={this.createIssueOrderOk} onCancel={this.createIssueOrderCancel}/>)
        return childrens;
    }

    refresh = (dataObject) => {
        TableUtils.refreshEdit(this, dataObject);
    }

    printOk = () => {
        this.setState({
            formPrintVisible: false,
            formPrintObject:{},
            document:{}
        });
    }

    printCancel = () => {
        this.setState({
            formPrintVisible: false,
        });
    }

    createIssueOrderOk = (dialogObject) => {
        let self = this;
        let objectRequest = {
            materials: dialogObject.materials,
            actionComment: dialogObject.actionComment,
            success: function(responseBody){
                self.setState({
                    createIssueOrderObject: {},
                    createIssueOrderVisible: false,
                    formPrintVisible: true,
                    formPrintObject: dialogObject.materials,
                    document: responseBody.document,
                });     
            }
        }
        IssueOrderByMaterialRequest.sendCreateIssueOrderByMaterialRequest(objectRequest);
    }

    createIssueOrderCancel = () => {
        this.setState({
            createIssueOrderObject: {},
            createIssueOrderVisible: false,
        });      
    }
}