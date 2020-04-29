import { Button, Tag, Input } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotUpdateRequest from '../../../api/gc/materialLot-update-manager/MaterialLotUpdateRequest';
import IconUtils from '../../../api/utils/IconUtils';

export default class GCMLotsUpdateLocationTable extends EntityScanViewTable {

    static displayName = 'GCMLotsUpdateLocationTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUpdateButton());
        return buttons;
    }

    UpdateLocation =() => {
        const {data,table} = this.state;
        let self = this;
        let queryFields = this.props.propsFrom.state.queryFields;
        let location = this.props.propsFrom.props.form.getFieldValue(queryFields[1].name);
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(location == "" || location == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseLocation));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            location: location,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotUpdateRequest.sendUpdateLocationRequest(requestObject);
    }

    createUpdateButton = () => {
        return <Button key="update" type="primary" style={styles.tableButton} loading={this.state.loading} onClick={this.UpdateLocation}>
                        {IconUtils.buildIcon("edit")}{I18NUtils.getClientMessage(i18NCode.BtnUpdate)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};