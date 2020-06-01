
import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';

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
        return <Tag color="#2db7f5">箱数：{materialLotIdList.length}</Tag>
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
        return <Tag color="#2db7f5">片数：{qty}</Tag>
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
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    buildOperationColumn = () => {
        
    }

}


