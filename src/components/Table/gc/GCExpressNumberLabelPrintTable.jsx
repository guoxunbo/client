import { Button, Input, Row, Col } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { PrintServiceUrl } from '../../../api/gc/GcConstDefine';
import EventUtils from '../../../api/utils/EventUtils';
import PrintUtils from '../../../api/utils/PrintUtils';
import EntityListTable from '../EntityListTable';


export default class GCExpressNumberLabelPrintTable extends EntityListTable {

    static displayName = 'GCExpressNumberLabelPrintTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{recordCount:0}};
    }

    createButtonGroup = () => {
        let buttons = [];
  
        buttons.push(this.createPrintObliqueLabelButton());

        return buttons;
    }
 
    printObliqueLabel = () => {
        let datas = this.state.data;
        let self = this;
        if (datas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        if (datas && datas.length > 0) {
            let requestObject = {
                datas : datas,    
                expressNumber: expressNumber,
                success: function(responseBody) {
                    let url = PrintServiceUrl.ObliqueBox;
                    responseBody.parameterMapList.forEach((parameter) => {
                        PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 1);
                    });
                    MessageUtils.showOperationSuccess();
                }
            }
            RecordExpressNumberRequest.sendObliqueLabelPrintRequest(requestObject);
        }
    }

    createPrintObliqueLabelButton = () => {
        return <Button key="print" type="primary"  style={styles.tableButton} loading={this.state.loading} icon="barcode" onClick={() => this.printObliqueLabel()}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPrintObliqueLabel)}
                    </Button>;
    }


    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
