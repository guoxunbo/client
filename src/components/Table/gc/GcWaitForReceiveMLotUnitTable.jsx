
import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';

/**
 * 待接收的晶圆
 */
export default class GcWaitForReceiveMLotUnitTable extends EntityScanViewTable {

    static displayName = 'GcWaitForReceiveMLotUnitTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">箱数：{this.state.data.length}</Tag>
    }

    createStatistic = () => {
        let materialLotUnits = this.state.data;
        let qty = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.reserved44 != undefined) {
                    qty = qty + parseInt(data.reserved44);
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


