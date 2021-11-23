
import { Button, Col, Input, Row } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import IconUtils from '../../../api/utils/IconUtils';
import GetPrintWltCpRequest from '../../../api/gc/get-print-wltcp-parameter/GetPrintWltCpRequest';
import EventUtils from '../../../api/utils/EventUtils';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';

export default class GcPrintWltCpLotTable extends EntityScanViewTable {

    static displayName = 'GcPrintWltCpLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createPrintCountInput());
        tags.push(this.createStatistic());
        return tags;
    }

    createPrintCountInput = () => {
        return  <Row gutter={6}>
            <Col span={3} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.PrintCount)}:
                </span>
            </Col>
            <Col span={3}>
                <Input ref={(printCount) => { this.printCount = printCount }} defaultValue={2} key="printCount" placeholder="打印份数"/>
            </Col>
        </Row>
    }

    handlePrint = () => {
        const {data} = this.state;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let printCount = this.printCount.state.value;

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        if (data && data.length > 0) {
            let requestObject = {
                materialLot : data[0],
                printCount: printCount,
                success: function(responseBody) {
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

