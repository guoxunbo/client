import { Button} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import EntityScanViewTable from '../EntityScanViewTable';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';

/**
 * 批量取消快递单号
 */
export default class GCBatchCancelExpressNumberTable extends EntityScanViewTable {

    static displayName = 'GCBatchCancelExpressNumberTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{recordCount:0}};
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createCancelWayBillNumberButton());
        return buttons;
    }

    batchCancelExpress = () => {
        let self = this;
        let orderList =  self.state.data;
        if (orderList.length === 0){
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let object = {
            orderList : orderList,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                self.setState({
                    data: [],
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                MessageUtils.showOperationSuccess();
            }
        };
        RecordExpressNumberRequest.sendBatchCancelExpressNumber(object);
    }

    createCancelWayBillNumberButton = () => {
        return <Button key="cancelWayBillNumber" type="primary" 
                        style={styles.tableButton} 
                        loading={this.state.loading} 
                        icon="delete"
                        onClick={this.batchCancelExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCancelWayBillOrder)}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};