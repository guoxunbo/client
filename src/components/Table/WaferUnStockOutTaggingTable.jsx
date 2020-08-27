
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityListCheckTable from './EntityListCheckTable';
import WltStockOutManagerRequest from '../../api/gc/wlt-stock-out/WltStockOutManagerRequest';

export default class WaferUnStockOutTaggingTable extends EntityListCheckTable {

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createCancelStockOutTag());
        return buttons;
    }

    UnstockOutTag = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        let requestObject = {
            materialLots : materialLots,
            success: function(responseBody) {
                self.refreshDelete(materialLots);
            }
        }

        WltStockOutManagerRequest.sendUnstockOutTagRequest(requestObject);
    }
    

    createCancelStockOutTag = () => {
        return <Button key="unStockOutTag" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.UnstockOutTag}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnTagging)}
                    </Button>
    }

}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
