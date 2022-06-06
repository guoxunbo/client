import { Button, Col, Input, Row } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import EventUtils from '../../../api/utils/EventUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';

/**
 * 三星外箱标签打印
 */
export default class GCSamsungOuterBoxLabelPrintTable extends EntityListCheckTable {

    static displayName = 'GCSamsungOuterBoxLabelPrintTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintCountInput());
        buttons.push(this.createPrintButton());
        return buttons;
    }

    createPrintCountInput = () => {
        return  <Row gutter={6}>
            <Col span={3} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.PrintCount)}:
                </span>
            </Col>
            <Col span={3}>
                <Input ref={(printCount) => { this.printCount = printCount }} defaultValue={1} key="printCount" placeholder="打印份数"/>
            </Col>
        </Row>
    }

    handlePrint = () => {
        const data = this.state.selectedRows;
        let self = this;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let requestObject = {
            documentLineList : data,
            printCount: this.printCount.state.value,
            success: function(responseBody) {
                self.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                });
                MessageUtils.showOperationSuccess();
            }
        }
        RecordExpressNumberRequest.sendSamsungOuterBoxLabelPrintRequest(requestObject);
    }

    createPrintButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="inbox" onClick={() => this.handlePrint()}>
                        {I18NUtils.getClientMessage(i18NCode.PrintLable)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
