import EntityScanViewTable from '../EntityScanViewTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Tag } from 'antd';

export default class MaterialLotQueryTable extends EntityScanViewTable {

    static displayName = 'MaterialLotQueryTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }


    createTagGroup = () => {
        let buttons = [];
        buttons.push(this.createNumberStatistic());
        return buttons;
    }

    createNumberStatistic = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(!data.errorFlag){
                    count = count +1;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{count}</Tag>
    }

    buildOperationColumn = () => {
        
    }

}
