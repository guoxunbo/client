
import EntityListCheckTable from '../EntityListCheckTable';

import { Button } from 'antd';
import AsyncManagerRequest from '@api/gc/async-manager/AsyncManagerRequest';
import { DefaultRowKey } from '@const/ConstDefine';
import EntityListTable from '../EntityListTable';

/**
 * 单据表单
 */
export default class OrderTable extends EntityListTable {

    static displayName = 'OrderTable';

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

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
