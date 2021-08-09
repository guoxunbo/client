
import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';

/**
 * 待发料的晶圆
 */
export default class GcWaitForIssueMLotUnitTable extends EntityScanViewTable {

    static displayName = 'GcWaitForIssueMLotUnitTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createWaferCount());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let materialLotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (materialLotIdList.indexOf(data.materialLotId) == -1) {
                    materialLotIdList.push(data.materialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{materialLotIdList.length}</Tag>
    }

    createWaferCount = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
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


