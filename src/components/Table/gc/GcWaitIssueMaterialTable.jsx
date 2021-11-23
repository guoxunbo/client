import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';

export default class GcWaitIssueMaterialTable extends EntityScanViewTable {

    static displayName = 'GcWaitIssueMaterialTable';

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createMaterialLotsNumber());
        return tags;
    }
    
    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    buildOperationColumn = () => {
        
    }

}


