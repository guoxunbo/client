import React from 'react';

import '@components/framework/table/ListTable.scss';
import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import TableObject from '@api/dto/ui/Table';
import ReceiveMaterialDialog from '@components/mms/dialog/ReceiveMaterialDialog';
import NoticeUtils from '@utils/NoticeUtils';
import SpareMaterialDialog from '../dialog/SpareMaterialDialog';
import ReceiveSpareMaterialDialog from '../dialog/ReceiveSpareMaterialDialog';
import { Upload } from 'antd';
import CsvImportRequest from '@api/csv-manager/CsvImportRequest';
import EventUtils from '@utils/EventUtils';
import SpareMaterialManagerRequest from '@api/spare-material-manager/SpareMaterialManagerRequest';

const TableName = {
    ReceiveMLot: "MMReceiveMLot"
}

export default class SpareMaterialTable extends EntityListTable {

    static displayName = 'SpareMaterialTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{receiveMaterialTable: {fields: []}}};
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<SpareMaterialDialog key={SpareMaterialDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);
        childrens.push(<ReceiveSpareMaterialDialog key={ReceiveSpareMaterialDialog.displayName} ref={this.formRef} object={this.state.receiveMaterialObject} visible={this.state.receiveMaterialFormVisible} 
                                                            table={this.state.receiveMaterialTable} onOk={this.handleReceiveMaterialOk} onCancel={this.handleCancelReceiveMaterialLot} />);                                   
        return childrens;
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createReceiveMaterialLotButton());
        return buttons;
    }

    createImportButton = () => {
        return  <Upload key="import" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    customRequest={(option) => this.handleUpload(option)} showUploadList={false} >
                    <Button style={{marginLeft: '20px'}} type="primary" loading={this.state.loading} icon="file-add">{I18NUtils.getClientMessage(i18NCode.SelectFile)}</Button>
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
            importTypeNbTable : "MMReceiveSpareMLot",
            success: function(responseBody) {
                let dataList = responseBody.dataList;
                
                self.afterUpload(dataList);         
            }
        }
        CsvImportRequest.sendImportRequest(requestObject, option.file);
    }

    afterUpload = (dataList) =>{
        let self = this;
        let requestObject = {
            dataList: dataList,
            success: function(responseBody) {
                self.setState({
                    data: responseBody.dataList,
                    loading: false
                });  
            }
        }
        SpareMaterialManagerRequest.sendImportMaterialRequest(requestObject);
    }

    createReceiveMaterialLotButton = () => {
        return <Button key="ReceiveMaterialLot" type="primary" className="table-button" icon="plus" onClick={() => this.handleReceiveMaterialLot()}>{I18NUtils.getClientMessage(i18NCode.BtnReceiveMaterialLot)}</Button>;
    }

    handleReceiveMaterialLot = () => {
        const selectedMaterial = this.getSingleSelectedRow();
        if (!selectedMaterial) {
            return;
        }
        let self = this;
        let requestObject = {
            name: TableName.ReceiveMLot,
            success: function(responseBody) {
                let table = responseBody.table;
                let receiveMaterialObject = TableObject.buildDefaultModel(table.fields, selectedMaterial);
                self.setState({
                    receiveMaterialTable: responseBody.table,
                    receiveMaterialObject: receiveMaterialObject,
                    receiveMaterialFormVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleReceiveMaterialOk = () => {
        this.setState({
            receiveMaterialFormVisible : false
        });
        NoticeUtils.showSuccess();
    }

    handleCancelReceiveMaterialLot = () => {
        this.setState({
            receiveMaterialFormVisible : false
        });
    }
}

// const styles = {
//     tableButton: {
//         marginLeft:'20px'
//     }
// };