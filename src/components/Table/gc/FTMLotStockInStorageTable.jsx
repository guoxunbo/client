
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';
import FtMLotManagerRequest from '../../../api/gc/ft-materialLot-manager/FtMLotManagerRequest';

/**
 * FT来料入中转箱
 */
export default class FTMLotStockInStorageTable extends EntityScanViewTable {

    static displayName = 'StockInStorageTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockInButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createPieceQty());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createPieceQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
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

    stockIn = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if(!this.validationStorageId(data)) {
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.TransferBoxOrStorageCannotEmpty));
            return;
        }
       
        let requestObject = {
            materialLotUnitList: data,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        FtMLotManagerRequest.sendFTStockInRequest(requestObject);
    }
    
    validationStorageId = (data) =>{
        let flag = true;
        data.forEach((materialLot) => {
            if( materialLot.storageId == undefined || materialLot.relaxBoxId == undefined){
                flag = false;
                return flag;
            }
        });
        return flag;
    }

    createStockInButton = () => {
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
