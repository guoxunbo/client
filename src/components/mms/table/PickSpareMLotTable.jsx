import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import IconUtils from '@api/utils/IconUtils';
import MaterialLotInvManagerRequest from '@api/material-lot-inv-manager/MaterialLotInvManagerRequest';

export default class PickSpareMLotTable extends EntityListTable {

    static displayName = 'PickSpareMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPickButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createPickButton = () => {
        return <Button key="pick" type="primary" className="table-button" onClick={this.handlePick}>
                        {IconUtils.buildIcon("icon-lingliao")}{I18NUtils.getClientMessage(i18NCode.BtnPick)}
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
}
