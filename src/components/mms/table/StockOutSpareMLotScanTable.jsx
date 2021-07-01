import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import IconUtils from '@api/utils/IconUtils';
import VcMaterialLotInventoryRequest from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest';
import NoticeUtils from '@utils/NoticeUtils';

export default class StockOutSpareMLotScanTable extends EntityListTable {

    static displayName = 'StockOutSpareMLotScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockOutButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createStockOutButton = () => {
        return <Button key="pick" type="primary" className="table-button" onClick={this.handleStockOut}>
                        {IconUtils.buildIcon("icon-lingliao")}{I18NUtils.getClientMessage(i18NCode.BtnStockOut)}
                    </Button>
    }
    
    handleStockOut = () => {
        let selectedRows = this.getScanedRows();
        if (selectedRows.length == 0) {
            return;
        }
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            return;
        }

        let object ={
            docId: documentLine.docId,
            materialLots: selectedRows,
            success: function(responseBody) {
                NoticeUtils.showSuccess();
            }
        }
        VcMaterialLotInventoryRequest.sendStockOutSpareMLotRequest(object);
    }
}
