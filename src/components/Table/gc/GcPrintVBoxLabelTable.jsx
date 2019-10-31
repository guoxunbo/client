
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import IconUtils from '../../../api/utils/IconUtils';
import GetPrintVboxParameterRequest from '../../../api/gc/get-print-vbox-parameter/GetPrintVboxParameterRequest';
import PrintUtils from '../../../api/utils/PrintUtils';
import { PrintServiceUrl } from '../../../api/gc/GcConstDefine';

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
                mesPackedLots : data,    
                success: function(responseBody) {
                    let url = PrintServiceUrl.Vbox;
                    responseBody.parameters.forEach((parameter) => {
                        PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 1);
                    });
                }
            }
            GetPrintVboxParameterRequest.sendQueryRequest(requestObject);

        }
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }

}

