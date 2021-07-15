import React from 'react';

import MaterialDialog from '@components/mms/dialog/MaterialDialog';
import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import TableObject from '@api/dto/ui/Table';
import ReceiveMaterialDialog from '@components/mms/dialog/ReceiveMaterialDialog';
import NoticeUtils from '@utils/NoticeUtils';
import IconUtils from '@utils/IconUtils';

const TableName = {
    ReceiveMLot: "MMReceiveMLot"
}

export default class MaterialTable extends EntityListTable {

    static displayName = 'MaterialTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{receiveMaterialTable: {fields: []}}};
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<MaterialDialog key={MaterialDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);
        childrens.push(<ReceiveMaterialDialog key={ReceiveMaterialDialog.displayName} ref={this.formRef} object={this.state.receiveMaterialObject} visible={this.state.receiveMaterialFormVisible} 
                                                            table={this.state.receiveMaterialTable} onOk={this.handleReceiveMaterialOk} onCancel={this.handleCancelReceiveMaterialLot} />);                                   
        return childrens;

    }

    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let self = this;
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createReceiveMaterialLotButton());
        return buttons;
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

