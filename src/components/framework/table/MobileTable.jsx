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

    createButtonGroup = () => {
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createStatistic());
        return tagList;
    }

    createStatistic = () => {
        return <Tag key="totalNumber" color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{this.state.data.length}</Tag>
    }
    
    /**
     * 历史表不能有操作
     */
    buildOperationColumn = () => {
        
    }
}
