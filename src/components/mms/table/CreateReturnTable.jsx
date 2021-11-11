import { Button, Upload } from 'antd';
import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import CreateMLotDialog from '../dialog/CreateMLotDialog';
import PrintReturnOrderDialog from '../dialog/PrintReturnOrderDialog';
import EventUtils from '@api/utils/EventUtils';
import VcImportExcelRequest from '@api/vc/import-excel-manager/VcImportExcelRequest';

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
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.creatReturnButton());
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

    creatReturnButton = () => {
        return <Button key="CreateReturnOrder" type="primary" className="table-button" icon="dropbox" onClick={this.CreateReturnOrder} loading={this.state.loading}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCreate)}
                    </Button>
    }

    CreateReturnOrder = () =>{
        let self = this ;
        let {data} = self.state;
        if(data.length == 0){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let objectRequest = {
            materialLots: data,
            success: function(responseBody){
                data.forEach(d => {
                    d.reservedQty = d.currentQty;
                });
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
                                            visible={this.state.formPrintVisible} orderName={"退货单"} onOk={this.printOk} onCancel={this.printOk}/>
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

    buildOperationColumn(scrollX) {
       
    }

}