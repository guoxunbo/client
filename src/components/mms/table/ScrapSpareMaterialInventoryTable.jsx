import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import IconUtils from '@api/utils/IconUtils';
import StockOutSpareMLotDialog from '@components/mms/dialog/StockOutSpareMLotDialog';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import TableObject from '@api/dto/ui/Table';
import { actionType } from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequestBody';
import NoticeUtils from '@utils/NoticeUtils';


export default class ScrapSpareMaterialInventoryTable extends EntityListTable {

    static displayName = 'ScrapSpareMaterialInventoryTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    createForm = () => {
        return  <StockOutSpareMLotDialog key={StockOutSpareMLotDialog.displayName} ref={this.formRef} object={this.state.formObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel}/>
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockOutButton());
        return buttons;
    }

    createStockOutButton = () => {
        return <Button key="stockOut" type="primary" className="table-button" onClick={() => this.handleStockOut(actionType.StockOutPartsMLot)}>
                        {IconUtils.buildIcon("icon-chuku")} {I18NUtils.getClientMessage(i18NCode.BtnStockOut)}
                    </Button>
    }

    handleStockOut = (action) => {
        const selectedObject = this.getSingleSelectedRow();
        if (!selectedObject) {
            return;
        }
        let self = this;
        let requestObject = {
            name: self.props.actionTable,
            success: function(responseBody) {
                let table = responseBody.table;
                let formObject = TableObject.buildDefaultModel(table.fields, selectedObject);
                formObject.actionType = action;
                self.setState({
                    formObject: formObject,
                    table: responseBody.table,
                    formVisible : true,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    handleOk = () =>{
        this.setState({
            formVisible : false,
        });
        NoticeUtils.showSuccess();
        this.props.queryData();
    }

    buildOperationColumn = () => {
        
    }
}