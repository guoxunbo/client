import { Button } from 'antd';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import RwMLotManagerRequest from '../../../api/gc/rw-manager/RwMLotManagerRequest';
import EntityScanViewTable from '../EntityScanViewTable';

export default class GCCobMLotAutoPackTable extends EntityScanViewTable {

    static displayName = 'GCRawMaterialInventoryTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAutoPackButton());
        return buttons;
    }

    autoPack = () => {
        let self = this;
        let materialLotList = self.state.data;
        if (materialLotList.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let requestObject = {
            materialLotList: materialLotList,
            success: function() {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        RwMLotManagerRequest.sendCOBMLotAutoPackRequest(requestObject);
    }

    createAutoPackButton = () => {
        return <Button key="autoPack" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.autoPack}>
                        包装
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
