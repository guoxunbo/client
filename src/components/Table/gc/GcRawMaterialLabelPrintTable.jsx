import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import RmaMLotManagerRequest from '../../../api/gc/rma-mlot-manager/RmaMLotManagerRequest';
import GetPrintRawMlotRequest from '../../../api/gc/get-print-rawMlot-parameter/GetPrintRawMlotRequest';

/**
 * 原材料标签补打
 */
export default class GcRawMaterialLabelPrintTable extends EntityScanViewTable {

    static displayName = 'GcRawMaterialLabelPrintTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintLable());
        buttons.push(this.createIRABoxPrintLable());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createPieceQty());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createPieceQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createPrintLable = () => {
        return <Button key="receive" type="primary" 
                       style={styles.tableButton} loading={this.state.loading} 
                       icon="plus" onClick={this.RawLabelPrint}>
                        {I18NUtils.getClientMessage(i18NCode.PrintLable)}
                    </Button>
    }
    createIRABoxPrintLable = () => {
        return <Button key="receive" type="primary" 
                       style={styles.tableButton} loading={this.state.loading} 
                       icon="plus" onClick={this.IRABoxLabelPrint}>
                        {I18NUtils.getClientMessage(i18NCode.IRABoxPrintLable)}
                    </Button>
    }

    RawLabelPrint = () => {
        let self = this;
        let materialLots = this.state.data;
        if (materialLots.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        let requestObject = {
            materialLots : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        GetPrintRawMlotRequest.sendPrintLableRequest(requestObject);
    }

    IRABoxLabelPrint = () => {
        let self = this;
        let materialLots = this.state.data;
        if (materialLots.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        let requestObject = {
            materialLots : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        GetPrintRawMlotRequest.sendIRABoxPrintLableRequest(requestObject);
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
