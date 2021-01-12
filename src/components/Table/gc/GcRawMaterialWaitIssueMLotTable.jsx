import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';

export default class GcRawMaterialWaitIssueMLotTable extends EntityScanViewTable {

    static displayName = 'GcRawMaterialWaitIssueMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">箱数：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLot = this.state.data;
        let count = 0;
        if(materialLot && materialLot.length > 0){
            materialLot.forEach(data => {
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


