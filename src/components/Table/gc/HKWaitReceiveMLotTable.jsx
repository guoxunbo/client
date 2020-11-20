import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';

/**
 * 香港仓待接收真空包
 */
export default class HKWaitReceiveMLotTable extends EntityScanViewTable {

    static displayName = 'HKWaitReceiveMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createStatistic = () => {
        let materialLotUnits = this.state.data;
        let qty = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Tag>
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


