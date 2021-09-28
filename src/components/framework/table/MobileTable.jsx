import React from 'react';

import { Tag } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import EntityListTable from './EntityListTable';

/**
 * 所有mobile显示的表格。不具备按钮操作
 */
export default class MobileTable extends EntityListTable {

    static displayName = 'MobileTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        }if (record.scaned) {
            return 'scaned-row';
        }else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };
    
    createButtonGroup = () => {
    }

    createTagGroup = () => {
        let tagList = [];
        if(this.props.showScanedQtyFlag){
            tagList.push(this.createScanedQty());
        }

        tagList.push(this.createStatistic());

        return tagList;
    }

    createStatistic = () => {
        return <Tag key="totalNumber" color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{this.state.data.length}</Tag>
    }

    createScanedQty = () => {
        return <Tag key="totalQty" color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.ScannedQty)}：{this.getScanedRows().length}</Tag>
    }
    
    /**
     * 历史表不能有操作
     */
    buildOperationColumn = () => {
        
    }
}