import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import IconUtils from '@api/utils/IconUtils';
import BarCodeDialog, { CodeType } from '@components/framework/dialog/BarCodeDialog';
import MaterialLotActionDialog from '@components/mms/dialog/MaterialLotActionDialog';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import TableObject from '@api/dto/ui/Table';
import { ActionType } from '@api/material-lot-manager/MaterialLotManagerRequestBody';
import NoticeUtils from '@utils/NoticeUtils';
import MaterialLotManagerRequest from '@api/material-lot-manager/MaterialLotManagerRequest';

const TableName = {
    MLotConsumeAction: "MMLotComsume"
}
export default class MaterialLotTable extends EntityListTable {

    static displayName = 'MaterialLotTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{materialLotActionTable: {fields: []}, showCodeType: "", okText: "", codeValue: ""}};
    }
    
    createForm = () => {
        let children = [];
        children.push(<BarCodeDialog width={400} type={this.state.showCodeType} key={BarCodeDialog.displayName} ref={this.formRef} value={this.state.codeValue} visible={this.state.barCodeFormVisible} 
                                                            okText={this.state.okText} onOk={this.handlePrintOk} onCancel={this.handleCancelPrint} />);                                   
        
        children.push(<MaterialLotActionDialog key={MaterialLotActionDialog.displayName} ref={this.formRef} object={this.state.materialLotAction} visible={this.state.materialLotActionVisible} 
                        action={this.state.action} table={this.state.materialLotActionTable} onOk={this.handleActionOk} onCancel={this.handleCancelAction} />);                                   
        return children;
    }

    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        buttons.push(this.createConsumeButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" className="table-button" onClick={this.handlePrint}>
                        {IconUtils.buildIcon("icon-barcode")}  {I18NUtils.getClientMessage(i18NCode.BtnPrint)}
                    </Button>
    }

    handlePrint=()=>{     
        const selectedObject = this.getSingleSelectedRow();
        if (!selectedObject) {
            return;
        }
        let requestObject = {
            materialLot: selectedObject,
            success: function(responseBody) {
                NoticeUtils.showSuccess();
            }
        }
        MaterialLotManagerRequest.sendPrintMaterialLotRequest(requestObject);
    }

    createConsumeButton = () => {
        return <Button key="consume" type="primary" className="table-button" onClick={() => this.handleAction(ActionType.Consume, TableName.MLotConsumeAction)}>
                        {IconUtils.buildIcon("icon-consume")}  {I18NUtils.getClientMessage(i18NCode.BtnConsume)}
                    </Button>
    }

    handleAction = (action, tableName) => {
        const selectedObject = this.getSingleSelectedRow();
        if (!selectedObject) {
            return;
        }
        let self = this;
        let requestObject = {
            name: tableName,
            success: function(responseBody) {
                let table = responseBody.table;
                let materialLotAction = TableObject.buildDefaultModel(table.fields, selectedObject);
                materialLotAction.materialLot = selectedObject;
                self.setState({
                    materialLotAction: materialLotAction,
                    materialLotActionTable: responseBody.table,
                    materialLotActionVisible : true,
                    action: action
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleActionOk =(materialLot) => {
        this.setState({
            materialLotActionVisible: false
        });
        this.refresh(materialLot);
    }

    handleCancelAction = () => {
        this.setState({
            materialLotActionVisible: false
        })
    }
    
    buildOperationColumn = () => {
        
    }

    /**
     * 物料批次不可更新和删除
     */
    // buildOperation = (record) => {
    //     let operations = [];
    //     operations.push(this.buildBarCodeButton(record));
    //     operations.push(this.buildQrCodeButton(record));
    //     return operations;
    // }

    handlePrintOk = () => {
        this.setState({
            barCodeFormVisible: false
        })
    }

    handleCancelPrint = () => {
        this.setState({
            barCodeFormVisible: false
        })
    }

    buildBarCodeButton = (record) => {
        return <Button key="barcode" style={{marginRight:'1px'}} onClick={() => this.handleShowBarCode(record)} size="small" href="javascript:;">
                     {IconUtils.buildIcon("icon-barcode")}
                </Button>;
    }

    buildQrCodeButton = (record) => {
        return <Button key="qrcode" style={{marginRight:'1px'}} onClick={() => this.handleShowQrCode(record)} size="small" href="javascript:;">
                     {IconUtils.buildIcon("icon-qrcodescan")}
                </Button>;
    }

    handleShowBarCode = (record) => {
        this.setState({
            barCodeFormVisible: true,
            codeValue: record.materialLotId,
            okText: I18NUtils.getClientMessage(i18NCode.BtnPrint),
            showCodeType: CodeType.BarCode
        })
    }

    handleShowQrCode = (record) => {
        this.setState({
            barCodeFormVisible: true,
            codeValue: JSON.stringify(record),
            okText: I18NUtils.getClientMessage(i18NCode.BtnDownload),
            materialLot: record,
            showCodeType: CodeType.QrCode
        })
    }
}
