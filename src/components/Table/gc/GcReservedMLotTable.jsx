
import { Button, Tag ,Input} from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import StockOutManagerRequest from '../../../api/gc/stock-out/StockOutManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';

/**
 * 备货表格
 */
export default class GcReservedMLotTable extends EntityListCheckTable {

    static displayName = 'GcStockOutMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createReserved());
        buttons.push(this.createInput());
        return buttons;
    }
    
    createInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="stockNote" placeholder="备货备注" onPressEnter={this.onExpressInput} />
        </div>
    }

    reserved = () => {
        let self = this;
        let stockNote = this.input.state.value;
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if (!documentLine) {
            self.setState({ 
                loading: false
            });
            return;
        }
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        let requestObj = {
            docLineRrn : documentLine.objectRrn,
            materialLots : materialLots,
            stockNote : stockNote,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }

        ReservedManagerRequest.sendReserved(requestObj);
    }

    createTotalNumber = () => {
        let materialLots = this.state.selectedRows;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">包数：{this.state.selectedRows.length}</Tag>
    }

    createReserved = () => {
        return <Button key="reserved" type="primary" style={styles.tableButton} icon="file-excel" onClick={this.reserved}>
                        备货
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
