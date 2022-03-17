import I18NUtils from '@api/utils/I18NUtils';
import EventUtils from '@api/utils/EventUtils';
import Notification from '@api/utils/NoticeUtils';
import { i18NCode } from '@api/const/i18n';
import NoticeUtils from '@api/utils/NoticeUtils';
import CsvImportRequest from '@api/csv-manager/CsvImportRequest';
import CsvImportTable from './CsvImportTable';

export default class IncomingLabMLotImportTable extends CsvImportTable {

    static displayName = 'IncomingLabMLotImportTable';

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
        CsvImportRequest.sendSaveMLotsRequest(requestObject);
    }

}
