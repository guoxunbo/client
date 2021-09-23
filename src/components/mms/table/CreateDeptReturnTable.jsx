import { Button } from 'antd';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateReturnTable from './CreateReturnTable';
import CreateDeptReturnDialog from '../dialog/CreateDeptReturnDialog';
import DeptReturnDialog from '../dialog/DeptReturnDialog';
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import PrintReturnOrderDialog from '../dialog/PrintReturnOrderDialog';
import TableUtils from '@components/framework/utils/TableUtils';
/**
 * 创建部门退料单
 */
export default class CreateDeptReturnTable extends CreateReturnTable {

    static displayName = 'CreateDeptReturnTable';

    constructor(props){
        super(props);
       this.state = {...this.state, documentId:'', formPrintObject:{},PrintObject:{}, document:[], formPrintVisible:false,PrintVisible:false};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.CreateReturnOrderButton());
        return buttons;
    }

    createForm = () => {
        let childrens = [];    
        childrens.push(<DeptReturnDialog key={DeptReturnDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);

        childrens.push (<CreateDeptReturnDialog key={CreateDeptReturnDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formPrintVisible} 
                                            table={this.state.materialLotCreateActionTable} onOk={this.crefresh} onCancel={this.chandleCancel} />); 

        childrens.push (<PrintReturnOrderDialog key={PrintReturnOrderDialog.displayName} ref={this.formRef} documentId={this.state.documentId}  document={this.state.document} object={this.state.PrintObject} visible={this.state.PrintVisible} 
                                             onOk={this.printOk} onCancel={this.printCancel} />);       
 
        return childrens;

    }
    crefresh = (doc) => {
        let self =this;
        let {data} = this.state;
        self.setState({
            formObject: [],
            formPrintVisible: false,
            PrintVisible:true,
            documentId:doc.name,
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
   

    DeptReturnOrder = () =>{
        let self=this;
        let {data} = this.state;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow)); 
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
        let DeptDialogTableName = this.props.materialLotCreateDeptDialogTableName;
        let requestObject = {
            name: DeptDialogTableName, 
            success: function(responseBody) {
                self.setState({
                    formPrintVisible: true,
                    formObject: data,
                    materialLotCreateActionTable: responseBody.table,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject); 
    }
  
    CreateReturnOrderButton = () => {
    return <Button key="CreateReturnOrder" type="primary" className="table-button" icon="dropbox" onClick={this.DeptReturnOrder} loading={this.state.loading}>
                    {I18NUtils.getClientMessage(i18NCode.BtnCreate)}
                </Button>
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

    refreshDelete = (records) => {
        TableUtils.refreshDelete(this, records);
    }
    
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
}