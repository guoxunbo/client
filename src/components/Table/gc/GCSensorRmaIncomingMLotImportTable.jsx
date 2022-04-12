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
    GCRMAGoodProductImport: "GCRMAGoodProductImport"
}

export default class GCSensorRmaIncomingMLotImportTable extends EntityListTable {

    static displayName = 'GCSensorRmaIncomingMLotImportTable';

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
        if(importType == "Sensor良品RMA"){
            importType = "GCRMAGoodProductImport";
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
                materialLotList = self.getMaterialLotListByImportType(fileName, materialLotList);
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

        if(importType == "Sensor良品RMA"){
            importType = "GCRMAGoodProductImport";
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
    }

    sendImportSaveRequest =(data, importType, checkFourCodeFlag) =>{
        let self = this;
        let requestObject = {
            dataList: data,
            importType: importType,
            checkFourCodeFlag: checkFourCodeFlag,
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
    
    getMaterialLotListByImportType = (fileName, materialLotList) => {
        materialLotList.forEach(materialLot =>{
            materialLot.reserved47 = fileName;
            materialLot.lotId = materialLot.reserved30;
            materialLot.materialLotId = materialLot.reserved31;
            if(materialLot.currentQty && isNaN(materialLot.currentQty)){
                materialLot.errorFlag = true;
            }
            if(materialLot.currentSubQty && isNaN(materialLot.currentSubQty)){
                materialLot.errorFlag = true;
            }
        });
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