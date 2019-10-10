
import { Button, Tag } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityScanViewTable from '../EntityScanViewTable';

export default class MesReceiveFGScanTable extends EntityScanViewTable {

    static displayName = 'MesReceiveFGScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    receive = () => {
        const {data} = this.state;
        if (data && data.length > 0) {
            let self = this;
            let requestObject = {
                mesPackedLots: data,
                success: function(responseBody) {
                    if (self.props.resetData) {
                        self.props.resetData();
                    }
                    MessageUtils.showOperationSuccess();
                }
            }
            FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
        }
    }

    createReceiveButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} icon="import" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
