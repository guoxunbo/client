import { Button, Tag, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';
import IconUtils from '../../../api/utils/IconUtils';

export default class GCMLotsUpdateTreasuryNoteTable extends EntityScanViewTable {

    static displayName = 'GCMLotsUpdateTreasuryNoteTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUpdateButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createDeleteRemarkInput());
        tags.push(this.createTotalQty());
        return tags;
    }

    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="treasuryeNote" placeholder="入库备注" />
        </div>
    }

    UpdateTreasuryNote =() => {
        const {data,table} = this.state;
        let self = this;
        let treasuryeNote = this.input.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(treasuryeNote == "" || treasuryeNote == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.TreasuryNoteCannotEmpty));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            treasuryeNote: treasuryeNote,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                self.input.setState({value:""})
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendUpdateRequest(requestObject);
    }

    createUpdateButton = () => {
        return <Button key="update" type="primary" style={styles.tableButton} loading={this.state.loading} onClick={this.UpdateTreasuryNote}>
                        {IconUtils.buildIcon("edit")}{I18NUtils.getClientMessage(i18NCode.BtnUpdate)}
                    </Button>
    }

    createTotalQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
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