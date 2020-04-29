import EntityListTable from "../EntityListTable";
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Upload } from 'antd';
import IncomingImportRequest from "../../../api/gc/incomingImport-manager/IncomingImportRequest";
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";


const TableName = {
    IncomingMaterialImport: "GCIncomingMaterialImport"
}

const ImportType = {
    GCCOBFinishProduct: "COB（-4成品）",
    GCWLAUnmeasured: "WLA未测（-2.5）",
    GCFabSensor2Unmeasured: "FAB sensor(-2未测)",
    GCLCDCPUnmeasured25: "LCD CP未测（-2.5未测）",
    GCFabLCD1UnmeasuredPTC: "FAB LCD(-1未测PTC)",
    GCFabLCD1UnmeasuredSilterra: "FAB LCD(-1未测Silterra)",
    GCFabSensor1Unmeasured: "FAB sensor(-1未测)",
    GCLCDCPMeasured26: "LCD CP已测（-2.6已测）",
    GCLCDCOGFinishProductEcretive: "LCD（COG成品-ECRETIVE）",
    GCWLTPackageReturn: "WLT封装回货（-3）",

    GCRMACustomerReturnFinishProduct: "RMA_客户退货_成品",
    GCRMAPureFinishProduct: "RMA纯_成品-4",
    GCRMAGoodProductImport: "RMA良品_-3.5导入",
    GCSensorCPMeasuredHuaLing: "sensor CP已测（-2.1华领）",
    GCSensorCPMeasuredKLT: "sensor CP已测（KLT）",
    GCSensorTplccSenBang: "sensor-tplcc（森邦-3.5）",
    GCSensorPackageReturn: "sensor封装回货（-3未测）",
    GCSensorPackageReturnCogo: "sensor封装回货（积高-3未测）",
    GCSensorUnmeasured: "sensor未测(-2未测)",
    GCFinishProductImport: "成品导入模板",
    GCSamsungPackingList: "三星packing list(-2CP未测)",
}

const ComType = [ImportType.GCCOBFinishProduct, ImportType.GCLCDCOGFinishProductEcretive];
const wltType = [ImportType.GCWLAUnmeasured];
const CpType = [ImportType.GCFabSensor2Unmeasured, ImportType.GCLCDCPUnmeasured25, ImportType.GCFabLCD1UnmeasuredPTC,
                ImportType.GCFabLCD1UnmeasuredSilterra, ImportType.GCFabSensor1Unmeasured,ImportType.GCLCDCPMeasured26];

export default class GCIncomingMaterialImportTable extends EntityListTable {

    static displayName = 'GCIncomingMaterialImportTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
        
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.createSaveButton());
        buttons.push(this.createDeleteAllButton());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createMaterialLotsNumber());
        tagList.push(this.createStatistic());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createErrorTag());
        return tagList;
    }

    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let materialLotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if(data.materialLotId){
                    if (materialLotIdList.indexOf(data.materialLotId) == -1) {
                        materialLotIdList.push(data.materialLotId);
                    }
                } else{
                    if (materialLotIdList.indexOf(data.reserved30) == -1) {
                        materialLotIdList.push(data.reserved30);
                    }
                }
            });
        }
        return <Tag color="#2db7f5">箱数：{materialLotIdList.length}</Tag>
    }

    createErrorTag = () => {
        let errorInfoList = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
        return <Tag color="#D2480A">异常数量：{errorInfoList.length}</Tag>
    }

    handleUpload = (option) => {
        const self = this;
        let tableData = this.state.data;
        let fileName = option.file.name;
        let queryFields = this.props.propsFrom.state.queryFields;
        let importType = this.props.propsFrom.props.form.getFieldValue(queryFields[0].name);
        //验证导入类型是否选择
        if((importType == undefined || importType == "")) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.ChooseImportTypePlease));
            return;
        }
        if(tableData.length > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotImported));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        

        let object = {
            importType: importType,
            fileName: fileName,
            success: function(responseBody) {
                let materialLotList = responseBody.dataList;
                let bondedProperty = responseBody.bondedProperty;
                materialLotList = self.getMaterialLotListByImportType(importType, bondedProperty, materialLotList);
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        IncomingImportRequest.sendSelectRequest(object, option.file);
    }

    importData =() => {
        const {data,table} = this.state;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let errorInfoList = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
        if(errorInfoList.length){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.AbnormalInfoOnThePage));
            return;
        }
        let queryFields = this.props.propsFrom.state.queryFields;
        let importType = this.props.propsFrom.props.form.getFieldValue(queryFields[0].name);
        let warehouseId = this.props.propsFrom.props.form.getFieldValue(queryFields[1].name);
        if(warehouseId == "" || warehouseId == undefined){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ChooseWarehouseIdPlease));
            return;
        }
        if(warehouseId == "ZJ_STOCK"){
            warehouseId = 8143;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            warehouseId: warehouseId,
            dataList: data,
            importType: importType,
            success: function(responseBody) {
                let importCode = responseBody.importCode;
                self.setState({
                    data: [],
                    loading: false
                }); 
                let message =  I18NUtils.getClientMessage(i18NCode.OperationSucceed);
                if(importCode != null || importCode != undefined){
                    message = message + `:${importCode}`;
                }
                MessageUtils.showOperationSuccess(message);
            }
        }
        IncomingImportRequest.sendImportRequest(requestObject);
    }

    deleteAllMaterialLot = () => {
        let self = this;
        if( self.state.data.length == 0){
            return;
        } else {
            self.props.resetData();
        }
    }
    
    getMaterialLotListByImportType = (importType, bondedProperty, materialLotList) => {
        materialLotList.forEach(materialLot =>{
            materialLot.reserved47 = importType;
            materialLot.reserved6 = bondedProperty;
            if(materialLot.currentQty && isNaN(materialLot.currentQty)){
                materialLot.errorFlag = true;
            }
            if(materialLot.reserved44 && isNaN(materialLot.reserved44)){
                materialLot.errorFlag = true;
            }
        });
        if(ComType.includes(importType)){
            materialLotList.forEach(materialLot =>{
                materialLot.lotId = materialLot.materialLotId;
            });
        } else if(wltType.includes(importType) || CpType.includes(importType)){
            materialLotList.forEach(materialLot =>{
                let fabLotId = materialLot.reserved30;
                let waferId = materialLot.reserved31;
                if(waferId.length < 2){
                    waferId = "0" + waferId;
                } 
                materialLot.unitId = fabLotId +"-"+ waferId;
            });
        } else if(ImportType.GCWLTPackageReturn == importType){
            materialLotList.forEach(materialLot =>{
                let fabLotId = materialLot.reserved30.split(".")[0];
                let waferId = materialLot.reserved31;
                if(waferId.length < 2){
                    waferId = "0" + waferId;
                } 
                materialLot.unitId = fabLotId +"-"+ waferId;
                materialLot.lotId = fabLotId;
            });
        }
        return materialLotList;
    }

    /**
     * 创建导入按钮
     */
    createImportButton = () => {
        return (<Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.BtnPreview)}</Button>
                </Upload>);
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">片数：{this.state.data.length}</Tag>
    }

    createSaveButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="import" onClick={this.importData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnImp)}
                    </Button>
    }

    createDeleteAllButton = () => {
        return <Button key="deleteAll" type="primary" style={styles.tableButton} icon="delete" onClick={this.deleteAllMaterialLot}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDeleteAll)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
    
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};