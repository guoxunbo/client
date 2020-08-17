import React from 'react';

import './ListTable.scss';
import EntityListTable from './EntityListTable';
import { Button } from 'antd';
import AsyncManagerRequest from '../../api/gc/async-manager/AsyncManagerRequest';


export default class ProductTable extends EntityListTable {

    static displayName = 'ProductTable';

    constructor(props) {
        super(props);
    }

    /**
     * 创建btn组。不同的table对button的组合要求不一样时。可以重载其方法做处理
     */
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(this.createAsyncProductInfoButton());
        return buttons;
    }

    createAsyncProductInfoButton = () => {
        return <Button key="AsyncMesProductInfo" type="primary" style={styles.tableButton} icon="file-excel" onClick={() => this.handleAsyncProductInfo()}>{"Product"}</Button>;
    }

    handleAsyncProductInfo = () => {
        let asyncType = "AsyncProduct";
        let object = {
            actionType : asyncType
        }
        AsyncManagerRequest.sendAsyncRequest(object);
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};