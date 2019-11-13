
import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';

/**
 * 待重测发料的物料批次
 */
export default class GcWaitForReTestMLotTable extends EntityScanViewTable {

    static displayName = 'GcReTestMLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        return buttons;
    }
    
    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    /**
     * 待重测发料列表不需要操作列
     */
    buildOperationColumn = () => {
        
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">包数：{this.state.data.length}</Tag>
    }

}


