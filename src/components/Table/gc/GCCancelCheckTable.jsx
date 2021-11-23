import { Button, Col, Row } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import MaterialLotManagerRequest from '../../../api/gc/material-lot-manager/MaterialLotManagerRequest';
import FormItem from 'antd/lib/form/FormItem';
import RefListField from '../../Field/RefListField';
import { SystemRefListName } from '../../../api/const/ConstDefine';

export default class GCCancelCheckTable extends EntityScanViewTable {

    static displayName = 'GCCancelCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createCancelButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createExpressInput());
        return tags;
    }

    createExpressInput = () => {
        return  <FormItem>
                    <Row gutter={10}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.CancelReason)}:</span>
                        </Col>
                        <Col span={4}>
                            <RefListField ref={(cancelReason) => { this.cancelReason = cancelReason }} referenceName={SystemRefListName.CancelCheckReason} />
                        </Col>
                    </Row>
                </FormItem>
    }

    cancelCheck =() => {
        const {data,table} = this.state;
        let self = this;
        
        let cancelReason = self.cancelReason.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(cancelReason == "" || cancelReason == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseCancelReason));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            cancelReason: cancelReason,
           
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotManagerRequest.sendGetCancelCheckRequest(requestObject);
    }

    createCancelButton = () => {
        return <Button key="cancelCheck" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.cancelCheck}>
                        {I18NUtils.getClientMessage(i18NCode.Cancel)}
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