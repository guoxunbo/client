import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';

export default class GcRawMaterialWaitIssueMLotTable extends EntityScanViewTable {

    static displayName = 'GcRawMaterialWaitIssueMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLot = this.state.data;
        let count = 0;
        if(materialLot && materialLot.length > 0){
            materialLot.forEach(data => {
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


