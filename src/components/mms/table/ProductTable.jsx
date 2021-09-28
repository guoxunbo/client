import React from 'react';

import EntityListTable from '@components/framework/table/EntityListTable';
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
        buttons.push(this.createAddAuthorityButton("AddProductMaterial"));
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

}

