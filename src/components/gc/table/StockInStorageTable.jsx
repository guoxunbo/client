
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { Button } from 'antd';
import I18NUtils from '@utils/I18NUtils';
import { i18NCode } from '@const/i18n';
import StockInManagerRequest from '@api/gc/stock-in/StockInManagerRequest';
import NoticeUtils from '@utils/NoticeUtils';

/**
 * 入库
 */
export default class StockInStorageTable extends EntityScanViewTable {

    static displayName = 'StockInStorageTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createStockInButton());
        return buttons;
    }

    stockIn = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: data,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                NoticeUtils.showSuccess();
            }
        }
        StockInManagerRequest.sendStockInRequest(requestObject);
    }

    createStockInButton = () => {
        return <Button key="packCaseCheck" type="primary" className="table-button" icon="inbox" onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

}


