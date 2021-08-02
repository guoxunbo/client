import EntityScanViewTable from '../EntityScanViewTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Tag } from 'antd';

export default class MobileTransferBoxAndStockInTable extends EntityScanViewTable {

    static displayName = 'MobileTransferBoxAndStockInTable';

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createMaterialLotsNumber());
        return tags;
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
