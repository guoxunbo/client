
import EntityListCheckTable from '../EntityListCheckTable';

import { Button } from 'antd';
import AsyncManagerRequest from '../../../api/gc/async-manager/AsyncManagerRequest';
import { DefaultRowKey } from '../../../api/const/ConstDefine';

/**
 * 单据表单
 */
export default class OrderTable extends EntityListCheckTable {

    static displayName = 'OrderTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExportDataButton());
        buttons.push(this.createAsyncErpButton());
        return buttons;
    }

    asyncErp = () => {
        const {asyncType} = this.props;
        let object = {
            actionType : asyncType
        }
        AsyncManagerRequest.sendAsyncRequest(object);
    }

    /**
     * GC要求只能选择一笔，但是要是checkBox的选中而非颜色的变化
     */
    selectRow = (record) => {
        let rowKey = this.props.rowKey || DefaultRowKey;
        let selectedRowKeys = [...this.state.selectedRowKeys];
        let selectedRows = [...this.state.selectedRows];

        let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
        if (checkIndex >= 0) {
            selectedRowKeys.splice(checkIndex, 1);
            selectedRows.splice(checkIndex, 1);
        } else {
            selectedRowKeys = [];
            selectedRows = [];
            selectedRowKeys.push(record[rowKey]);
            selectedRows.push(record);
        }
        this.setState({ 
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    buildOperationColumn = () => {
        
    }

     /**
     * 同步EPR
     */
    createAsyncErpButton = () => {
        return <Button key="asyncErp" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.asyncErp}>
                        {"ERP"}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
