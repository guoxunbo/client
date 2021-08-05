import CsvImportRequest from "@api/csv-manager/CsvImportRequest";
import MaterialLotReleaseRequest from "@api/material-lot-release/MaterialLotReleaseRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import { DefaultRowKey } from "@const/ConstDefine";
import { i18NCode } from "@const/i18n";
import EventUtils from "@utils/EventUtils";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button, Input, Upload } from "antd";
import MaterialLotReleaseDialog from "../dialog/MaterialLotReleaseDialog";

export default class MaterialLotReleaseTable extends EntityListTable{

    static displayName = 'MaterialLotReleaseTable' ;

    constructor(props){
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.createReleaseButton());
        buttons.push(this.createResetSelectRow());
        return buttons;
    }

    createImportButton = () => {
        return  <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
                </Upload>;
    }

    handleUpload = (option) => {
        const self = this;
        let fileName = option.file.name;
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let requestObject = {
            fileName: fileName,
            importTypeNbTable : "MMSReleaseMaterialLot",
            success: function(responseBody) {
                self.afterUpload(responseBody);
            }
        }
        CsvImportRequest.sendImportRequest(requestObject, option.file);
    }

    afterUpload(responseBody){
        let self = this;
        let dataList = responseBody.dataList;
        let {data} = self.state;
        if(data.length == 0){
            self.props.properties.queryData();
            data = self.state.data;
        }
        let showData = [];
        let scanedFlag = false;        
        self.setState({selectedRowKeys: [], selectedRows: []});
        data.map((materialLotHold, index)=>{
            dataList.forEach(d => {
                if(materialLotHold.materialLotId == d.materialLotId || materialLotHold.unitId == d.unitId){
                    scanedFlag = true;
                }
            });
            if(scanedFlag){
                self.selectRow(materialLotHold);
                showData.unshift(materialLotHold);
                scanedFlag = false;
            }else{
                showData.push(materialLotHold);
            }
        })
        self.setState({
            data: showData,
            loading: false
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

    buildOperationColumn =()=>{

    }

    createReleaseButton =()=>{
        return <Button key="release" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.releaseMLot}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRelease)}
                    </Button>
    }

    createResetSelectRow =()=>{
        return <Button key="resetSelectRow" type="primary" style={styles.tableButton} icon="redo" loading={this.state.loading} onClick={this.resetSelectRow}>
                        {I18NUtils.getClientMessage("清空")}
                    </Button>
    }

    resetSelectRow =()=>{
        this.setState({
            selectedRows: [],
            selectedRowKeys: [],
        });
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

    releaseMLot =() => {
        let selectedRows = this.getSelectedRows();
        if(selectedRows.length == 0){
            return;
        }
        let actionTable = this.props.releaseActionTable;
        this.setState({
            formVisible: true,
            formObject: selectedRows,
            releaseActionTable : actionTable
        });
    }

    createForm = () => {
        return  <MaterialLotReleaseDialog key={MaterialLotReleaseDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.releaseActionTable} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    refresh = () => {
        let selectedRows = this.getSelectedRows();
        this.refreshDelete(selectedRows);
        this.setState({
            formObject: [],
            formVisible: false,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
        });
        NoticeUtils.showSuccess();
    }

    handleCancel = () => {
        this.setState({
            formVisible: false
        });
    }
}
const styles = {
    input: {
        width: 200,
        marginLeft:'20px'
    },
    tableButton: {
        marginLeft:'20px'
    }
};