import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import VcImportExcelRequest from "@api/vc/import-excel-manager/VcImportExcelRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button } from "antd";
import VcAddRmaNoDialog from "../dialog/VcAddRmaNoDialog";

export default class VcAddRmaInfoTable extends EntityListTable {

    static displayName = 'VcAddRmaInfoTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.creatAddRmaNoButton());
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

    creatAddRmaNoButton = () => {
        return  <Button key="AddRmaNo" type="primary" className="table-button" icon="dropbox" onClick={this.AddRmaNo} loading={this.state.loading}>
                    {I18NUtils.getClientMessage(i18NCode.BtnAdd)}
                </Button>
    }

    AddRmaNo = () =>{
        let self = this;
        let {data} = this.state;
        debugger;
        let requestObject = {
            name: this.props.AddRmaNoActionTableName, 
            success: function(responseBody) {
                self.setState({
                    addRmaNoObject: {materialLots: data},
                    addRmaNoVisible: true,
                    addRmaNoTable: responseBody.table
                });  
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject); 
    }

    createForm = () => {
        return  <VcAddRmaNoDialog 
                    key={VcAddRmaNoDialog.displayName} 
                    ref={this.formRef} 
                    object={this.state.addRmaNoObject} 
                    visible={this.state.addRmaNoVisible} 
                    table={this.state.addRmaNoTable} 
                    onOk={this.refresh} onCancel={this.handleCancel}/>
    }

    refresh = (materialLotList) =>{
        this.setState({
            addRmaNoObject: {},
            addRmaNoVisible: false,
            data: materialLotList
        }); 
        NoticeUtils.showSuccess();
    }

    handleCancel = () =>{
        this.setState({
            addRmaNoObject: {},
            addRmaNoVisible: false,
        }); 
    }

    buildOperationColumn(){

    }
}