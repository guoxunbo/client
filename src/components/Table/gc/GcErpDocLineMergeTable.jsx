import { Button} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityListCheckTable from '../EntityListCheckTable';
import EventUtils from '../../../api/utils/EventUtils';
import ErpDocLineMergeManagerRequest from '../../../api/gc/erp-docLine-manager/ErpDocLineMergeManagerRequest';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';


export default class GcErpDocLineMergeTable extends EntityListCheckTable {

    static displayName = 'GcErpDocLineMergeTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMergeDocLineButton());
        return buttons; 
    }

    mergeDocLine = () => {
        debugger;
        let self = this;
        let documentLines = self.state.selectedRows;
        if (!documentLines || documentLines.length < 2) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastTwoRow));
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
        ErpDocLineMergeManagerRequest.sendMergeDocRequest(requestObject);
    }

    createMergeDocLineButton = () => {
        return <Button key="mergeDoc" type="primary" style={styles.tableButton} loading={this.state.loading} icon="plus" onClick={this.mergeDocLine}>
                        {I18NUtils.getClientMessage(i18NCode.BtnMergeDocLine)}
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
