import React from 'react';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { Button, Upload } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import EventUtils from '@api/utils/EventUtils';
import Notification from '@api/utils/NoticeUtils';
import { i18NCode } from '@api/const/i18n';
import NoticeUtils from '@api/utils/NoticeUtils';
import CsvImportRequest from '@api/csv-manager/CsvImportRequest';

export default class CsvImportTable extends EntityScanViewTable {

    static displayName = 'CsvImportTable';
    
    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        buttons.push(this.createSaveButton());
        buttons.push(this.createDeleteAllButton());
        return buttons;
    }

    createImportButton = () => {
        return  <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
                </Upload>;
    }

    createSaveButton = () => {
        return  <Button key="save" type="primary" className="table-button" onClick={() => this.SaveButton()} icon="import-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnImp)}
                </Button>
    }

    createDeleteAllButton = () => {
        return  <Button key="delete" type="primary" className="table-button" onClick={() => this.deleteAllMaterialLot()} icon="delete-o">
                         {I18NUtils.getClientMessage(i18NCode.BtnReset)}
                </Button>
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
            importTypeNbTable : self.props.importTypeNbTable,
            success: function(responseBody) {
                let dataList = responseBody.dataList;
                self.setState({
                    data: dataList,
                    loading: false
                });           
            }
        }
        CsvImportRequest.sendImportRequest(requestObject, option.file);
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
                self.setState({
                    data: [],
                    loading: false
                });
                NoticeUtils.showSuccess();
            }
        }
        CsvImportRequest.sendSaveProductRequest(requestObject);
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