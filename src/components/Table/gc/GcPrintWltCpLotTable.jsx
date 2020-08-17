
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import IconUtils from '../../../api/utils/IconUtils';
import GetPrintVboxParameterRequest from '../../../api/gc/get-print-vbox-parameter/GetPrintVboxParameterRequest';
import PrintUtils from '../../../api/utils/PrintUtils';
import { PrintServiceUrl } from '../../../api/gc/GcConstDefine';
import GetPrintWltCpRequest from '../../../api/gc/get-print-wltcp-parameter/GetPrintWltCpRequest';
import EventUtils from '../../../api/utils/EventUtils';
import MessageUtils from '../../../api/utils/MessageUtils';

export default class GcPrintWltCpLotTable extends EntityScanViewTable {

    static displayName = 'GcPrintWltCpLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createPrintButton());
        return buttons;
    }

    handlePrint = () => {
        const {data} = this.state;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        if (data && data.length > 0) {
            let requestObject = {
                materialLot : data[0],
                success: function(responseBody) {
                    let url = PrintServiceUrl.WltLotId;
                    PrintUtils.MultiPrintWithBtIbForWeb(url, responseBody.parameterMap, 1);
                    MessageUtils.showOperationSuccess();
                }
            }
            GetPrintWltCpRequest.sendQueryPrintParmeterRequest(requestObject);

        }
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" loading={this.state.loading} onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }

}

