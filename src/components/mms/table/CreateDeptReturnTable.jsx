import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintReturnOrderDialog from '../dialog/PrintReturnOrderDialog';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import CreateDeptReturnDialog from '../dialog/CreateDeptReturnDialog';
import EntityListTable from '@components/framework/table/EntityListTable';
import { Button, Upload } from 'antd';
import EventUtils from '@utils/EventUtils';
import VcImportExcelRequest from '@api/vc/import-excel-manager/VcImportExcelRequest';
/**
 * 创建部门退料单
 */
export default class CreateDeptReturnTable extends EntityListTable {

    static displayName = 'CreateDeptReturnTable';

    constructor(props){
        super(props);
        this.state = {...this.state, documentId:'', formPrintObject:{}, document:{}, formPrintVisible:false};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.creatDeptReturnButton());
        return buttons;
    }

    handleUpload = (option) => {
        const self = this;
        const {table} = this.state;
        self.setState({loading: true})
        let requestObject = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                let dataList = responseBody.materialLotList;
                if(!dataList || dataList.length == 0){
                    NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
                }
                self.setState({loading: false, data:dataList})
            }
        }
        VcImportExcelRequest.sendImportExcelGetMLotRequest(requestObject, option.file);
    }

    creatDeptReturnButton = () => {
        return <Button key="CreateReturnOrder" type="primary" className="table-button" icon="dropbox" onClick={this.CreateReturnOrder} loading={this.state.loading}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCreate)}
                    </Button>
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<CreateMLotDialog key={CreateMLotDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);                               
        childrens.push(<PrintReturnOrderDialog key={PrintReturnOrderDialog.displayName} documentId={this.state.documentId} object={this.state.formPrintObject} 
                                            visible={this.state.formPrintVisible} orderName={"部门退料单"} onOk={this.printOk} onCancel={this.printOk}/>)
        childrens.push(<CreateDeptReturnDialog key={CreateDeptReturnDialog.displayName} ref={this.formRef} object={this.state.createDeptReturnObject} visible={this.state.createDeptReturnVisible} 
                table={this.state.createDeptReturnActionTable} onOk={this.createDeptReturnOk} onCancel={this.createDeptReturnCancel} />);
        return childrens;
    }

    createDeptReturnOk = (doc) => {
        let self =this;
        let {data} = this.state;
        data.map((d, index)=>{
            d.reservedQty = d.transQty
        })
        self.setState({
            createDeptReturnObject: {},
            createDeptReturnVisible: false,
            formPrintVisible: true,
            formPrintObject: data,
            documentId: doc.name,
        });      
        NoticeUtils.showSuccess();
    }

    createDeptReturnCancel = () => {
        this.setState({
            createDeptReturnObject: {},
            createDeptReturnVisible: false,
        });      
    }
    
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
        let requestObject = {
            name: this.props.createDeptReturnActionTableName, 
            success: function(responseBody) {
                self.setState({
                    createDeptReturnObject: {materialLots: data},
                    createDeptReturnVisible: true,
                    createDeptReturnActionTable: responseBody.table
                });  
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject); 
    }

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        return operations;
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