import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import AsyncManagerRequest from '@api/gc/async-manager/AsyncManagerRequest';
import ProductDialog from '@components/mms/dialog/ProductDialog';


export default class ProductTable extends EntityListTable {

    static displayName = 'ProductTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createForm = () => {
        let childrens = [];
        childrens.push(<ProductDialog key={ProductDialog.displayName} ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                                        table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />);
        return childrens;

    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
       // buttons.push(this.createAsyncMESButton());
        return buttons;
    }
}

