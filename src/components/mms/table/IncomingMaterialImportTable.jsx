import React from 'react';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { Button, Upload } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import EventUtils from '@api/utils/EventUtils';
import Notification from '@api/utils/NoticeUtils';
import IncomingMaterialImportRequest from '@api/Incoming-Material-Manager/IncomingMaterialImportRequest';
import { i18NCode } from '@api/const/i18n';
import SyncIncomingOrReturnMLotRequest from '@api/sync/incoming-return-mlot/SyncIncomingOrReturnMLotRequest';
import { SyncActionType } from '@api/sync/incoming-return-mlot/SyncIncomingOrReturnMLotRequestBody';
import NoticeUtils from '@api/utils/NoticeUtils';

export default class IncomingMaterialImportTable extends EntityScanViewTable {

    static displayName = 'IncomingMaterialImportTable';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSyncButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createSaveButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createDeleteAllButton());
        return buttons;
    }

    createSyncButton = () => {
        return (<Button key="Sync" type="primary" className="table-button" loading={this.state.loading} onClick={() => this.handleSync()} icon="import-o">
                {I18NUtils.getClientMessage(i18NCode.BtnSync)}
            </Button>)
    }

    createImportButton = () => {
        return  <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
                </Upload>;
    }

    createSaveButton = () => {
        return  <Button key="receive" type="primary" className="table-button" loading={this.state.loading} onClick={() => this.SaveButton()} icon="import-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnImp)}
                </Button>
    }

    createDeleteAllButton = () => {
        return  <Button key="delete" type="primary" className="table-button" loading={this.state.loading} onClick={() => this.deleteAllMaterialLot()} icon="delete-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnReset)}
                </Button>
    }

    handleSync = () =>{
        let self = this;
        let object = {
            actionType: SyncActionType.SyncMainMLotIncomingOrReturn,
            success:function () {
                self.setState({
                    loading: false,
                }); 
                NoticeUtils.showSuccess();
            }
        }
        SyncIncomingOrReturnMLotRequest.sendSyncIncomingOrReturnRequest(object);
    }

    handleUpload = (option) => {
        const self = this;
        let fileName = option.file.name;
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let object = {
            fileName: fileName,
            importTypeNbTable : this.props.incomingType,
            success: function(responseBody) {
                let materialLotList = responseBody.dataList;
                self.setState({
                    data: materialLotList,
                    loading: false
                });           
            }
        }
        IncomingMaterialImportRequest.sendSelectRequest(object, option.file);
    }
    
    SaveButton = () => {
        const {data,table} = this.state;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let requestObject = {
            dataList: data,
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
                Notification.showNotice(I18NUtils.getClientMessage(message));
            }
        }
        IncomingMaterialImportRequest.sendImportRequest(requestObject);
    }
 
    deleteAllMaterialLot = () => {
        let self = this;
        if( self.state.data.length == 0){
            return;
        } else {
            self.props.resetData();
        }
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};