import { Button, Tag, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';

export default class GCMaterialLotReleaseTable extends EntityScanViewTable {

    static displayName = 'GCMaterialLotReleaseTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReleaseButton());
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

    relaese =() => {
        const {data,table} = this.state;
        let self = this;
        let remarks = this.input.state.value;
        let queryFields = this.props.propsFrom.state.queryFields;
        let reason = this.props.propsFrom.props.form.getFieldValue(queryFields[1].name);
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(reason == "" || reason == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseReleaseReason));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            reason: reason,
            remarks: remarks,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendReleaseMaterialLotRequest(requestObject);
    }

    createReleaseButton = () => {
        return <Button key="release" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.relaese}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRelease)}
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