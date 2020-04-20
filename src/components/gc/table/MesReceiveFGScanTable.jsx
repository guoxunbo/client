
import { Button, Tag } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import FinishGoodInvManagerRequest from '@api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';

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
                    NoticeUtils.showSuccess();
                }
            }
            FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
        }
    }

    createReceiveButton = () => {
        return <Button key="receive" type="primary" className="table-button" icon="import" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

}


