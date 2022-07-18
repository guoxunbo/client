
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import IconUtils from '../../../api/utils/IconUtils';
import GetPrintVboxParameterRequest from '../../../api/gc/get-print-vbox-parameter/GetPrintVboxParameterRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

export default class GcPrintVBoxLabelTable extends EntityScanViewTable {

    static displayName = 'GcPrintVBoxLabelTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createPrintButton());
        return buttons;
    }

    handlePrint = () => {
        const {data} = this.state;
        if (data && data.length > 0) {
            let requestObject = {
                materialLotList : data,    
                success: function(responseBody) {
                    MessageUtils.showOperationSuccess();
                }
            }
            GetPrintVboxParameterRequest.sendPrintLabelRequest(requestObject);
        }
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }

}

