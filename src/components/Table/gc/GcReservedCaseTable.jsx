import { Button, Tag , Input} from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';
import ReservedCaseMLotForm from './ReservedCaseMLotForm';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';

/**
 * 备货表格
 */
export default class GcReservedCaseTable extends EntityListCheckTable {

    static displayName = 'GcReservedCaseTable';

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


    createForm = () => {
        return  <ReservedCaseMLotForm docLineRrn={this.props.docLineRrn} stockNote={this.state.stockNote} visible={this.state.formVisible} packageLots={this.state.packageLots} onOk={this.handleCancel} onCancel={this.handleCancel} />
    }

    reserved = () => {
        let packageLots = this.getSelectedRows();
        if (packageLots.length === 0 ) {
            return;
        }
        let stockNote = this.input.state.value;

        this.setState({
            formVisible : true,
            packageLots: packageLots,
            stockNote: stockNote,
        }); 
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
        return <Tag color="#2db7f5">箱数：{this.state.selectedRows.length}</Tag>
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
