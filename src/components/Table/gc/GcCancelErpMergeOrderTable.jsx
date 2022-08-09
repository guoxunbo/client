import { Button} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityListCheckTable from '../EntityListCheckTable';
import EventUtils from '../../../api/utils/EventUtils';
import ErpDocLineMergeManagerRequest from '../../../api/gc/erp-docLine-manager/ErpDocLineMergeManagerRequest';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';


export default class GcCancelErpMergeOrderTable extends EntityListCheckTable {

    static displayName = 'GcCancelErpMergeOrderTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUnMergeOrderButton());
        return buttons; 
    }

    unMergeDocLine = () => {
        let self = this;
        let documentLines = self.state.selectedRows;
        if (documentLines.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            documentLines : documentLines,    
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        ErpDocLineMergeManagerRequest.sendUnMergeOrderRequest(requestObject);
    }

    createUnMergeOrderButton = () => {
        return <Button key="unMergeDoc" type="primary" style={styles.tableButton} loading={this.state.loading} onClick={this.unMergeDocLine}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnMergeDocLine)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
