import CsvImportRequest from "@api/csv-manager/CsvImportRequest";
import VcDeliveryOrderRequest from "@api/vc/delivery-order-manager/VcDeliveryOrderRequest";
import EntityDialog from "@components/framework/dialog/EntityDialog";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import EventUtils from "@utils/EventUtils";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Upload, Button } from "antd";
import DeliveryOrderPrintDialog from "../dialog/DeliveryOrderPrintDialog";

const importTypeNbTable = "VcDeliveryOrderPrint"

export default class VcDeliveryOrderTable extends EntityListTable {

    static displayName = 'VcDeliveryOrderTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, PrintFormVisible: '', recordData: ''};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.createSaveButton());
        return buttons;
    }

    createImportButton = () => {
        return  <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading}  icon = "file-add">{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
                </Upload>;
    }

    createSaveButton = () => {
        return  <Button key="save" type="primary" className="table-button" onClick={this.SaveButton} icon = "import-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnImp)}
                </Button>
    }

    handleUpload = (option) => {
        const self = this;
        let fileName = option.file.name;
        self.setState({
            loading: true,
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let object = {
            fileName: fileName,
            importTypeNbTable : importTypeNbTable,
            success: function(responseBody) {
                let dataList = responseBody.dataList;
                self.setState({
                    data: dataList,
                    loading: false
                });           
            }
        }
        CsvImportRequest.sendImportRequest(object, option.file);
    }

    SaveButton = () => {
        const {data,table} = this.state;
        let self = this;
        if(data.length == 0){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let requestObject = {
            documentLineList: data,
            success: function(responseBody) {
                self.setState({
                    data: responseBody.documentLineList,
                    loading: false
                });
                NoticeUtils.showSuccess();
            }
        }
        VcDeliveryOrderRequest.sendSaveRequest(requestObject);
    }

     /**
     * 修改、打印
     */
    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildEditButton(record));
        operations.push(this.buildPrintButton(record));
        return operations;
    }

    buildEditButton = (record) => {
        return <Button key="edit" style={{marginRight:'1px'}} icon="edit" size="small" 
                        onClick={() => this.openDialog(record)} 
                        disabled={false} href="javascript:;"/>
    }

    openDialog =(record)=>{
        this.setState({
            formVisible : true,
            editorObject: record
        })
    }

    buildPrintButton = (record) => {
        return <Button key="printButton" style={{marginRight:'1px'}} onClick={() => this.handlePrint(record)} size="small" href="javascript:;">
                            {IconUtils.buildIcon("icon-barcode")}
                    </Button>
    }

    handlePrint=(record)=>{
        this.setState({
            PrintFormVisible: true,
            recordData: record,
        });
    }

    createForm = () => {
        let dialog = [];
        dialog.push(<DeliveryOrderPrintDialog width={900} 
                        key={DeliveryOrderPrintDialog.displayName} 
                        ref={this.formRef} 
                        visible={this.state.PrintFormVisible}
                        recordData ={this.state.recordData}
                        onOk={this.handlePrintOk} onCancel={this.handleCancelPrint} />);
        dialog.push(<EntityDialog ref={this.formRef} 
                        object={this.state.editorObject} 
                        visible={this.state.formVisible} 
                        table={this.state.table} 
                        onOk={this.refresh} 
                        onCancel={this.handleCancel} />);
        return dialog;
    }

    handlePrintOk=()=>{
        this.setState({
            PrintFormVisible: false
        });
    }

    handleCancelPrint=()=>{
        this.setState({
            PrintFormVisible: false
        });
    }
}
const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};