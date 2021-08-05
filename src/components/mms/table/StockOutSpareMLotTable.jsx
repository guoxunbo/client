import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import IconUtils from '@api/utils/IconUtils';
import StockOutSpareMLotDialog from '../dialog/StockOutSpareMLotDialog';
import { actionType } from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequestBody';

export default class StockOutSpareMLotTable extends EntityListTable {

    static displayName = 'StockOutSpareMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockOutButton());
        return buttons;
    }

    buildOperationColumn = () => {

    }

    createForm = () => {
        return  <StockOutSpareMLotDialog key={StockOutSpareMLotDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel}/>
    }

    createStockOutButton = () => {
        return <Button key="pick" type="primary" className="table-button" onClick={() => this.handleStockOut(actionType.StockOutPartsMLotByOrder)}>
                        {IconUtils.buildIcon("icon-lingliao")}{I18NUtils.getClientMessage(i18NCode.BtnStockOut)}
                    </Button>
    }
    
    handleStockOut = (action) => {
        let selectedRows = this.getSingleSelectedRow();
        let self = this;
        if (!selectedRows) {
            return;
        }
        selectedRows.actionType = action;
        self.setState({
            formObject: selectedRows,
            formVisible: true,
        });
    }

    handleOk = () =>{
        this.setState({
            formVisible : false,
        });
        this.props.queryData();
    }


}
