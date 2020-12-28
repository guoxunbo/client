import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import GCRawMaterialImportRequest from '../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest';

/**
 * 原材料接收
 */
export default class GcRawMaterialReceiveTable extends EntityScanViewTable {

    static displayName = 'GcRawMaterialReceiveTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createErrorNumberStatistic());
        buttons.push(this.createReceive());
        return buttons;
    }
    
    getErrorCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.errorFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
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

    rawMaterialReceive = () => {
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }

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
        GCRawMaterialImportRequest.sendReceiveRawMaterialRequest(requestObject);
    }

    createReceive = () => {
        return <Button key="receive" type="primary" 
                        style={styles.tableButton} 
                        loading={this.state.loading} 
                        icon="plus" 
                        onClick={this.rawMaterialReceive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
