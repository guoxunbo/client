import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityScanViewTable from '../EntityScanViewTable';

export default class WLTReceiveFGScanTable extends EntityScanViewTable {

    static displayName = 'WLTReceiveFGScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteAllButton());
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createMaterialLotsNumber());
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
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
                        window.location.reload(true);
                    }
                    MessageUtils.showOperationSuccess();
                }
            }
            FinishGoodInvManagerRequest.sendWLTReceiveRequest(requestObject);
        }
    }

    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let cstIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (cstIdList.indexOf(data.cstId) == -1) {
                    cstIdList.push(data.cstId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{cstIdList.length}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.quantity != undefined) {
                    count = count + data.quantity;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }
    
    createDeleteAllButton = () => {
        return <Button key="deleteAll" type="primary" style={styles.tableButton} icon="delete" onClick={this.deleteAllMaterialLot}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDeleteAll)}
                    </Button>
    }

    deleteAllMaterialLot = () => {
        let self = this;
        if( self.props.data.length == 0){
            return;
        } else {
            self.props.resetData();
            MessageUtils.showOperationSuccess();
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
