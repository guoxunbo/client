import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';

export default class GcWaitReceiveRawMaterialTable extends EntityScanViewTable {

    static displayName = 'GcWaitReceiveRawMaterialTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

    //数量存在小数，最多为4位小数，先转化为正式，总和再转换为小数
    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty*10000;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count/10000}</Tag>
    }

    buildOperationColumn = () => {
        
    }

}


