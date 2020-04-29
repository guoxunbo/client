import { Button, Tag, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';

export default class GCMaterialLotHoldTable extends EntityScanViewTable {

    static displayName = 'GCMaterialLotHoldTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createHoldButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createRemarkInput());
        return tags;
    }

    createRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="remarks" placeholder="备注" />
        </div>
    }

    hold =() => {
        const {data,table} = this.state;
        let self = this;
        let remarks = this.input.state.value;
        let queryFields = this.props.propsFrom.state.queryFields;
        let holdReason = this.props.propsFrom.props.form.getFieldValue(queryFields[1].name);
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(holdReason == "" || holdReason == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseHoldReason));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            reason: holdReason,
            remarks: remarks,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendHoldMaterialLotRequest(requestObject);
    }

    createHoldButton = () => {
        return <Button key="hold" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.hold}>
                        {I18NUtils.getClientMessage(i18NCode.BtnHold)}
                    </Button>
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