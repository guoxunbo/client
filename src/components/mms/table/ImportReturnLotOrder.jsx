import I18NUtils from '@api/utils/I18NUtils';
import EventUtils from '@api/utils/EventUtils';
import Notification from '@api/utils/NoticeUtils';
import { i18NCode } from '@api/const/i18n';
import NoticeUtils from '@api/utils/NoticeUtils';
import CsvImportTable from './CsvImportTable';
import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';

/**
 * 退货单导入
 */
export default class ImportReturnLotOrder extends CsvImportTable {

    static displayName = 'ImportReturnLotOrder';

    SaveButton = () => {
        const {data,table} = this.state;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        let requestObject = {
            dataList: data,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    loading: false
                });
                NoticeUtils.showSuccess();
            }
        }
        ReturnLotOrderRequest.sendCreateReturnGoodsRequest(requestObject);
    }

}
