import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button } from 'antd';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintPickOrderDialog from '../dialog/PrintPickOrderDialog';
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import TableUtils from '@components/framework/utils/TableUtils';
import CreateIssueOrderByMaterialDialog from '../dialog/CreateIssueOrderByMaterialDialog';

/**
 * 创建指定物料领料发料单
 */
export default class CreateIssueOrderByMaterialInfoTable extends EntityListTable {

    static displayName = 'CreateIssueOrderByMaterialInfoTable';

    constructor(props){
        super(props);
        this.state = {...this.state, documentId:'', formPrintObject:{},PrintObject:{}, document:[], formPrintVisible:false,PrintVisible:false};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.CreateIssueGetOrderButton());
        return buttons;
    }
   
    createForm = () => {
        let childrens = [];

        childrens.push(<CreateMLotDialog key={CreateMLotDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);

        childrens.push(<CreateIssueOrderByMaterialDialog key={CreateIssueOrderByMaterialDialog.displayName}  ref={this.formRef} object={this.state.formObject} visible={this.state.formPrintVisible}
                                                         table={this.state.CreateIssueMaterialMLotActionTable} onOk={this.crefresh} onCancel={this.chandleCancel} />);  
  
        childrens.push(<PrintPickOrderDialog key={PrintPickOrderDialog.displayName} document={this.state.document} object={this.state.PrintObject} 
                                             visible={this.state.PrintVisible} onOk={this.printOk} onCancel={this.printCancel}/>);
        return childrens;
    }

    crefresh = (doc) => {
        let self =this;
        let {data} = this.state;
        self.setState({
            formObject: [],
            formPrintVisible: false,
            PrintVisible:true,
            document:doc,
            PrintObject:data,
        });      
        NoticeUtils.showSuccess();
    }

    chandleCancel = () => {
        this.setState({
            formPrintVisible: false
        });
    }

    printOk = () => {
        let selectedRows = this.state.selectedRows;
        this.refreshDelete(selectedRows);
        this.setState({
            PrintObject:[],
            PrintVisible: false,
            loading: false,  
        });      
    }

    printCancel = () => {
        this.setState({
            PrintVisible: false,
        });
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
        let CreateIssueMAterialDialogTableName = this.props.materialLotCreateIssueOrderMaterDialogTableName;
        let objectRequest = {
            name : CreateIssueMAterialDialogTableName,
            success: function(responseBody){
                self.setState({
                    formObject: data,
                    formPrintVisible: true,
                    CreateIssueMaterialMLotActionTable: responseBody.table,

                })
            }
        }
        TableManagerRequest.sendGetByNameRequest(objectRequest); 
    }
    
    refreshDelete = (records) => {
        TableUtils.refreshDelete(this, records); }

    selectRow = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];
    
        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex >= 0) {
            selectedRowKeys.splice(checkIndex, 1);
            selectedRows.splice(checkIndex, 1);
        } else {
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
        
    } 

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    }

    CreateIssueGetOrderButton = () => {
        return (<Button key="CreateIssueGetMaterialOrder" type="primary"  icon="file-excel" onClick={this.handleCreatePick} loading={this.state.loading} >
                        {I18NUtils.getClientMessage(i18NCode.BtnCreate)}
                </Button>)}
}