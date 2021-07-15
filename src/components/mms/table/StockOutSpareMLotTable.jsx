import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import IconUtils from '@api/utils/IconUtils';
import VcMaterialLotInventoryRequest from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest';
import NoticeUtils from '@utils/NoticeUtils';
import StockOutSpareMLotDialog from '../dialog/StockOutSpareMLotDialog';

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
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    createStockOutButton = () => {
        return <Button key="pick" type="primary" className="table-button" onClick={this.handleStockOut}>
                        {IconUtils.buildIcon("icon-lingliao")}{I18NUtils.getClientMessage(i18NCode.BtnStockOut)}
                    </Button>
    }
    
    handleStockOut = () => {
        let selectedRows = this.getSingleSelectedRow();
        let self = this;
        if (!selectedRows) {
            return;
        }
        self.setState({
            formObject: selectedRows,
            formVisible: true
        });
        

        // let selectedRows = this.getScanedRows();
        // if (selectedRows.length == 0) {
        //     return;
        // }
        // let documentLine = this.props.orderTable.getSingleSelectedRow();
        // if (!documentLine) {
        //     return;
        // }

        // let object ={
        //     docId: documentLine.docId,
        //     materialLots: selectedRows,
        //     success: function(responseBody) {
        //         NoticeUtils.showSuccess();
        //     }
        // }
        // VcMaterialLotInventoryRequest.sendStockOutSpareMLotRequest(object);
    }


}
