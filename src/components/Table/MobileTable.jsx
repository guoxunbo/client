import React from 'react';

import './ListTable.scss';
import EntityListTable from './EntityListTable';

/**
 * 所有mobile显示的表格。不具备按钮操作
 */
export default class MobileTable extends EntityListTable {

    static displayName = 'EntityHistoryTable';

    createButtonGroup = () => {
    }

    /**
     * 历史表不能有操作
     */
    buildOperationColumn = () => {
        
    }
}
