
import EntityListCheckTable from '../EntityListCheckTable';

import { Button } from 'antd';
import AsyncManagerRequest from '../../../api/gc/async-manager/AsyncManagerRequest';
import EntityListTable from '../EntityListTable';
import EventUtils from '../../../api/utils/EventUtils';

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
        
        this.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

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
        return <Button key="asyncErp" type="primary" loading={this.state.loading} style={styles.tableButton} icon="file-excel" onClick={this.asyncErp}>
                        {"ERP"}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
