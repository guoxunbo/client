import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import EntityListCheckTable from "../EntityListCheckTable";


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
        return <Button key="receive" type="primary" style={styles.tableButton} icon="import" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    receive = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
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