
import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';


/**
 * FT待接收来料信息
 */
export default class GcFTWaitReceiveMaterialLotTable extends EntityScanViewTable {

    static displayName = 'GcFTWaitReceiveMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createWaferIdNumber());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createExportDataButton());
        return buttons;
    }
    
    createWaferIdNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createBoxNumber = () => {
        let materialLotUnits = this.state.data;
        let lotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (lotIdList.indexOf(data.lotId) == -1) {
                    lotIdList.push(data.lotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{lotIdList.length}</Tag>
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

    buildOperationColumn = () => {
        
    }

}


