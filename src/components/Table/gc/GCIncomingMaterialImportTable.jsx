import EntityListTable from "../EntityListTable";
import { Button, Icon, Modal, Switch, Tag } from 'antd';
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
    GCCOBFinishProduct: "GCCOBFinishProduct",//COB（-4成品）
    GCCOBRawMaterialProduct: "GCCOBRawMaterialProduct",//COM原料导入
    GCSOCFinishProduct: "GCSOCFinishProduct",//SOC（-4成品）
    GCWLAUnmeasured: "GCWLAUnmeasured",//WLA未测（-2.5）
    GCFabSensor2Unmeasured: "GCFabSensor2Unmeasured",//FAB sensor(-2未测)
    GCLCDCPUnmeasured25: "GCLCDCPUnmeasured25",//LCD CP未测（-2.5未测）
    GCFabLCD1UnmeasuredPTC: "GCFabLCD1UnmeasuredPTC",//FAB LCD(-1未测PTC)
    GCFabLCD1UnmeasuredSilterra: "GCFabLCD1UnmeasuredSilterra",//FAB LCD(-1未测Silterra)
    GCFabSensor1Unmeasured: "GCFabSensor1Unmeasured",//FAB sensor(-1未测)
    GCLCDCPMeasured26: "GCLCDCPMeasured26",//LCD CP已测（-2.6已测）
    GCLCDCOGFinishProductEcretive: "GCLCDCOGFinishProductEcretive",//LCD（COG成品-ECRETIVE）
    GCWLTPackageReturn: "GCWLTPackageReturn",//WLT封装回货（-3）
    GCLcdCogDetial: "GCLcdCogDetial",//LCD(COG成品-明细)
    GCSensorPackageReturn: "GCSensorPackageReturn",//sensor封装回货（-3未测）
    GCRMAGoodProductImport: "GCRMAGoodProductImport",//Sensor RMA良品_-3.5导入
    GCWltRMAGoodProductImport: "GCWltRMAGoodProductImport",//Wlt RMA良品_-3.5导入
    GCRMACustomerReturnFinishProduct: "GCRMACustomerReturnFinishProduct",//RMA_客户退货_成品
    GCRMAPureFinishProduct: "GCRMAPureFinishProduct",//RMA纯_成品-4
    GCSamsungPackingList: "GCSamsungPackingList",//三星packing list(-2CP未测)

    GCSensorUnmeasured: "GCSensorUnmeasured",//sensor未测(-2未测)
    GCSensorCPMeasuredHuaLing: "GCSensorCPMeasuredHuaLing",//sensor CP已测（-2.1华领）
    GCSensorCPMeasuredKLT: "GCSensorCPMeasuredKLT",//sensor CP已测（KLT）
    GCSensorPackageReturnCogo: "GCSensorPackageReturnCogo",//sensor封装回货（积高-3未测）
    GCSensorTplccSenBang: "GCSensorTplccSenBang",//sensor-tplcc（森邦-3.5）
    
    GCFinishProductImport: "GCFinishProductImport",//成品导入模板
    GCSOCWaferUnmeasured: "GCSOCWaferUnmeasured",//SOC(-2.5,-2.55未测/-2.6已测)
    GCMaskFinishProduct: "GCMaskFinishProduct",//Mask成品导入
}

const ComType = [ImportType.GCCOBFinishProduct, ImportType.GCSOCFinishProduct, ImportType.GCCOBRawMaterialProduct];
const wltType = [ImportType.GCWLAUnmeasured, ImportType.GCMaskFinishProduct];
const CpType = [ImportType.GCFabSensor2Unmeasured, ImportType.GCLCDCPUnmeasured25, ImportType.GCFabLCD1UnmeasuredPTC,
                ImportType.GCFabLCD1UnmeasuredSilterra, ImportType.GCFabSensor1Unmeasured,ImportType.GCLCDCPMeasured26,
                ImportType.GCSensorPackageReturn, ImportType.GCSOCWaferUnmeasured, ImportType.GCSensorCPMeasuredHuaLing,
                ImportType.GCSensorCPMeasuredKLT, ImportType.GCSensorUnmeasured, ImportType.GCSensorPackageReturnCogo,
                ImportType.GCSensorTplccSenBang];
const RMAType = [ImportType.GCRMAGoodProductImport, ImportType.GCWltRMAGoodProductImport,ImportType.GCRMACustomerReturnFinishProduct, ImportType.GCRMAPureFinishProduct];

const resetLocationType = [ImportType.GCWLAUnmeasured, ImportType.GCRMAGoodProductImport, ImportType.GCWltRMAGoodProductImport, ImportType.GCRMACustomerReturnFinishProduct, 
                           ImportType.GCRMAPureFinishProduct, ImportType.GCCOBFinishProduct, ImportType.GCLCDCOGFinishProductEcretive,
                           ImportType.GCSOCFinishProduct, ImportType.GCCOBRawMaterialProduct, ImportType.GCMaskFinishProduct];

export default class GCIncomingMaterialImportTable extends EntityListTable {

    static displayName = 'GCIncomingMaterialImportTable';

    constructor(props) {
        super(props);
        this.state = {...this.state,...{checked:true},...{value: "check"}};
    }

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
        tagList.push(this.createCheckFourCodeFlag());
        tagList.push(this.createMaterialLotsNumber());
        tagList.push(this.createStatistic());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createErrorTag());
        return tagList;
    }

    createCheckFourCodeFlag = () => {
        return <span style={{display: 'flex'}}>
            <span style={{marginLeft:"30px", fontSize:"16px"}}>{I18NUtils.getClientMessage(i18NCode.FourCodeCheckFlag)}:</span>
            <span style = {{marginLeft:"10px"}}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                        checkedChildren={<Icon type="check" />} 
                        unCheckedChildren={<Icon type="close" />} 
                        onChange={this.handleChange} 
                        disabled={this.disabled}
                        checked={this.state.checked}/>
            </span>
        </span>
    }

    handleChange = (checkedChildren) => {
        if(checkedChildren){
            this.setState({ 
                value: "check",
                checked: true
            });
        } else {
            this.setState({ 
                value: "",
                checked: false
            });
        }
    }

    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let materialLotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if(data.parentMaterialLotId){
                    if (materialLotIdList.indexOf(data.parentMaterialLotId) == -1) {
                        materialLotIdList.push(data.parentMaterialLotId);
                    }
                }else if(data.materialLotId){
                    if (materialLotIdList.indexOf(data.materialLotId) == -1) {
                        materialLotIdList.push(data.materialLotId);
                    }
                } else if (data.durable){
                    if (materialLotIdList.indexOf(data.durable) == -1) {
                        materialLotIdList.push(data.durable);
                    }
                } else{
                    if (materialLotIdList.indexOf(data.reserved30) == -1) {
                        materialLotIdList.push(data.reserved30);
                    }
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{materialLotIdList.length}</Tag>
    }

    createErrorTag = () => {
        let errorInfoList = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{errorInfoList.length}</Tag>
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
        if(importType == "COM原料导入"){
            importType = "GCCOBRawMaterialProduct";
        } else if(importType == "COB（-4成品）"){
            importType = "GCCOBFinishProduct";
        }
        if(tableData.length > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotImportedPleaseCleanAllBeforeSelectNewFile));
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
                materialLotList = self.getMaterialLotListByImportType(importType, bondedProperty, fileName, materialLotList);
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        IncomingImportRequest.sendSelectRequest(object, option.file);
    }

    importData =() => {
        const {data} = this.state;
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
        let warehouseId = this.props.propsFrom.props.form.getFieldValue(queryFields[1].name);
        if(warehouseId == "" || warehouseId == undefined){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ChooseWarehouseIdPlease));
            return;
        }


        if(warehouseId == "ZJ_STOCK" || warehouseId == "浙江仓库"){
            warehouseId = 8143;
        } else if(warehouseId == "SH_STOCK" || warehouseId == "上海仓库"){
            warehouseId = 8142;
        } else if(warehouseId == "HK_STOCK" || warehouseId == "香港仓库"){
            warehouseId = 8150;
        } else if(warehouseId == "BS_STOCK" || warehouseId == "保税仓库") {
            warehouseId = 8151;
        }

        let location = data[0].reserved6;
        if((location == "ZSH" && (warehouseId == "8142" || warehouseId == "8151")) 
            || (location == "SH" && (warehouseId == "8143" || warehouseId == "8151")) 
            || (location == "BS" && (warehouseId == "8142" || warehouseId == "8143"))){
            Modal.confirm({
                title: '操作提示',
                content: I18NUtils.getClientMessage(i18NCode.TheLocationAndWarehouseIsNotSame),
                okText: '确认',
                cancelText: '取消',
                onOk:() => {
                    this.doSave(warehouseId);
                },
                onCancel:() => {
                    return;
                }
            });
        } else {
            this.doSave(warehouseId);
        }
    }

    doSave =(warehouseId) =>{
        let self = this;
        const {data,table} = this.state;
        let queryFields = this.props.propsFrom.state.queryFields;
        let checkFourCodeFlag = this.state.value;
        let importType = this.props.propsFrom.props.form.getFieldValue(queryFields[0].name);

        if(importType == "COM原料导入"){
            importType = "GCCOBRawMaterialProduct";
        } else if(importType == "COB（-4成品）"){
            importType = "GCCOBFinishProduct";
        }

        if(warehouseId == 8142){
            data.forEach(materialLot =>{
                materialLot.reserved13 = warehouseId;
                materialLot.reserved14 = "HJ AZ5000";
            });
        } else if(warehouseId == 8143){
            data.forEach(materialLot =>{
                materialLot.reserved13 = warehouseId;
                materialLot.reserved14 = "ZHJ AZ6000";
            });
        } else if(warehouseId == 8150 || warehouseId == 8151){
            data.forEach(materialLot =>{
                materialLot.reserved13 = warehouseId;
            });
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        if(RMAType.includes(importType)){
            let requestObject = {
                dataList: data,
                success: function(responseBody) {
                    let importFlag = responseBody.importFlag;
                    if(importFlag) {
                        Modal.confirm({
                            title: '操作提示',
                            content: I18NUtils.getClientMessage(i18NCode.TheMaterialLotIsExistedInStroage),
                            okText: '确认',
                            cancelText: '取消',
                            onOk:() => {
                                self.sendImportSaveRequest(data, importType, checkFourCodeFlag);
                            },
                            onCancel:() => {
                                self.setState({
                                    loading: false
                                }); 
                                return;
                            }
                        });
                    } else {
                        self.sendImportSaveRequest(data, importType, checkFourCodeFlag);
                    }
                }
            }
            IncomingImportRequest.sendValidateRmaRequest(requestObject);
        } else {
            self.sendImportSaveRequest(data, importType, checkFourCodeFlag);
        }
    }

    sendImportSaveRequest =(data, importType, checkFourCodeFlag) =>{
        let self = this;
        let requestObject = {
            dataList: data,
            importType: importType,
            checkFourCodeFlag: checkFourCodeFlag,
            success: function(responseBody) {
                let importCode = responseBody.importCode;
                if(importCode == "" || importCode == null || importCode == undefined){
                    self.setState({
                        loading: false
                    }); 
                    Notification.showError(I18NUtils.getClientMessage(i18NCode.ImportExceptionAndReImport));
                } else {
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
    
    getMaterialLotListByImportType = (importType, bondedProperty, fileName, materialLotList) => {
        materialLotList.forEach(materialLot =>{
            materialLot.reserved47 = fileName;
            if(materialLot.currentQty && isNaN(materialLot.currentQty)){
                materialLot.errorFlag = true;
            }
            if(materialLot.currentSubQty && isNaN(materialLot.currentSubQty)){
                materialLot.errorFlag = true;
            }
        });
        if(!resetLocationType.includes(importType)){
            materialLotList.forEach(materialLot =>{
                materialLot.reserved6 = bondedProperty;
            });
        }
        if(ComType.includes(importType)){
            materialLotList.forEach(materialLot =>{
                materialLot.lotId = materialLot.materialLotId;
            });
        } else if(RMAType.includes(importType)){
            materialLotList.forEach(materialLot =>{
                materialLot.lotId = materialLot.reserved30;
                materialLot.materialLotId = materialLot.reserved31;
            });
        } else if(wltType.includes(importType) || CpType.includes(importType)){
            materialLotList.forEach(materialLot =>{
                let fabLotId = materialLot.reserved30.split(".")[0];
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
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
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