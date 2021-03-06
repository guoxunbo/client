import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import TableObject from '@api/dto/ui/Table';
import IconUtils from '@api/utils/IconUtils';
import TransferMLotInventoryDialog from '@components/mms/dialog/TransferMLotInventoryDialog';
import MaterialLotInvManagerRequest from '@api/material-lot-inv-manager/MaterialLotInvManagerRequest';
import CheckMLotInventoryDialog from '@components/mms/dialog/CheckMLotInventoryDialog';

const TableName = {
    MLotTransferInventory: "MMLotTransferInv",
    MLotInvCheck: "MMLotInvCheck"
}

export default class MaterialLotInventoryTable extends EntityListTable {

    static displayName = 'MaterialLotInventoryTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{transferMLotInventoryTable: {fields: []}, checkMLotInventoryTable: {fields: []}}};
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<TransferMLotInventoryDialog key={TransferMLotInventoryDialog.displayName} ref={this.formRef} object={this.state.mLotInventory} visible={this.state.transferMLotInvFormVisible} 
                            table={this.state.transferMLotInventoryTable} onOk={this.handleTransferOk} onCancel={this.handleCancelTransfer} />);                                   
        childrens.push(<CheckMLotInventoryDialog key={CheckMLotInventoryDialog.displayName} ref={this.formRef} object={this.state.mLotInventory} visible={this.state.checkMLotInvFormVisible} 
                            table={this.state.checkMLotInventoryTable} onOk={this.handleCheckOk} onCancel={this.handleCancelCheck} />);                                   
            
        return childrens;
    }

    createButtonGroup = () => {
        let buttons = [];
        // buttons.push(this.createStockOutButton());
        buttons.push(this.createTransferInvButton());
        buttons.push(this.createPickButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createStockOutButton = () => {
        return <Button key="stockOut" type="primary" className="table-button" onClick={this.handleStockOut}>
                        {IconUtils.buildIcon("icon-chuku")} {I18NUtils.getClientMessage(i18NCode.BtnStockOut)}
                    </Button>
    }
    
    /**
     * 出库
     * 会扣减库存数量以及物料批次数量，相当于出货
     * 一次出库必须把数量全部出完。如果有出一半的，进行物料批次分批之后再出
     */
    handleStockOut = () => {
        const selectedObject = this.getSingleSelectedRow();
        if (!selectedObject) {
            return;
        }
        var self = this;
        let object = {
            mLotInventory: selectedObject,
            success: function() {
                self.refreshDelete(selectedObject);
            }
        };
        MaterialLotInvManagerRequest.sendStockOutRequest(object);
    }

    createTransferInvButton = () => {
        return <Button key="transferInv" type="primary" className="table-button" onClick={this.handleTransferMLotInv}>
                        {IconUtils.buildIcon("icon-zhongzhuanku")} {I18NUtils.getClientMessage(i18NCode.BtnStockTransfer)}
                    </Button>
    }

    handleTransferMLotInv = () => {
        const selectedObject = this.getSingleSelectedRow();
        if (!selectedObject) {
            return;
        }
        let self = this;
        let requestObject = {
            name: TableName.MLotTransferInventory,
            success: function(responseBody) {
                let table = responseBody.table;
                let transferInv = TableObject.buildDefaultModel(table.fields, selectedObject);
                self.setState({
                    transferMLotInventoryTable: responseBody.table,
                    mLotInventory: transferInv,
                    transferMLotInvFormVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleTransferOk = (materialLotInventory) => {
        this.setState({
            transferMLotInvFormVisible : false
        });
        this.refresh(materialLotInventory);
    }

    handleCancelTransfer = () => {
        this.setState({
            transferMLotInvFormVisible : false
        });
    }

    createPickButton = () => {
        return <Button key="pick" type="primary" className="table-button" onClick={this.handlePick}>
                        {IconUtils.buildIcon("icon-lingliao")}{I18NUtils.getClientMessage("下架")}
                    </Button>
    }
    
    /**
     * 领料
     */
    handlePick = () => {
        const selectedObject = this.getSingleSelectedRow();
        if (!selectedObject) {
            return;
        }
        var self = this;
        let object = {
            mLotInventory: selectedObject,
            success: function() {
                self.refreshDelete(selectedObject);
            }
        };
        MaterialLotInvManagerRequest.sendPickRequest(object);
    }

    /**
     * 库存不可删除，只能盘点
     */
    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildCheckButton(record));
        return operations;
    }

    buildCheckButton = (record) => {
        return <Button key="check" style={{marginRight:'1px'}} onClick={() => this.handleCheck(record)} size="small" href="javascript:;">
                     {IconUtils.buildIcon("icon-pandian")}
                </Button>;
    }

    /**
     * 盘点。
     */
    handleCheck = (record) => {
        let self = this;
        let requestObject = {
            name: TableName.MLotInvCheck,
            success: function(responseBody) {
                let table = responseBody.table;
                let transferInv = TableObject.buildDefaultModel(table.fields, record);
                self.setState({
                    checkMLotInventoryTable: responseBody.table,
                    mLotInventory: transferInv,
                    checkMLotInvFormVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleCheckOk = (materialLotInventory) => {
        this.setState({
            checkMLotInvFormVisible : false
        });
        if (materialLotInventory) {
            this.refresh(materialLotInventory);
        } else {
            this.refreshDelete(this.state.mLotInventory);
        }
       
    }

    handleCancelCheck = () => {
        this.setState({
            checkMLotInvFormVisible : false
        });
    }
}
