import { Button, Tag} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import EntityScanViewTable from '../EntityScanViewTable';
import { Notification } from '../../notice/Notice';
import RwMaterialManagerRequest from '../../../api/gc/rw-material-manager/RwMaterialManagerRequest';

/**
 * Blade辅料接收
 */
export default class GCRwBladeScanReceiveTable extends EntityScanViewTable {

    static displayName = 'GCRwBladeScanReceiveTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createTapeReceiveButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createPackageNumber());
        return tags;
    }

    createPackageNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    bladeReceive = () => {
        let self = this;
        let materialLotList =  self.state.data;
        if (materialLotList.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let object = {
            materialLotList : materialLotList,
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
        RwMaterialManagerRequest.sendReceiveBladeMaterial(object);
    }

    createTapeReceiveButton = () => {
        return <Button key="bladeReceive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="plus"onClick={this.bladeReceive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};