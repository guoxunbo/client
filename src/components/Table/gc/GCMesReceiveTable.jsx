import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import EntityListCheckTable from "../EntityListCheckTable";
import EventUtils from '../../../api/utils/EventUtils';
import { Notification } from '../../notice/Notice';

export default class GCMesReceiveTable extends EntityListCheckTable {

    static displayName = 'GCMesReceiveTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{this.state.data.length}</Tag>
    }

    createReceiveButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="import" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    receive = () => {
        let self = this;
        const {selectedRows} = self.state;
        if (!selectedRows || selectedRows.length == 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let materialLots = this.getSelectedRows();
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        if (materialLots && materialLots.length > 0) {
            let self = this;
            let requestObject = {
                mesPackedLots: materialLots,
                success: function(responseBody) {
                    self.refreshDelete(materialLots);
                }
            }
            FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
        }
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};