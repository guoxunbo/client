
import { Button, Tag } from 'antd';
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

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStatistic());
        tags.push(this.createWaferNumber());
        tags.push(this.createTotalNumber());
        return tags;
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

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
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
