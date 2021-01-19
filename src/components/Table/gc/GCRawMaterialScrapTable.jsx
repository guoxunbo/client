import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import EntityScanViewTable from "../EntityScanViewTable";
import {Button, Input, Row, Col} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import RefListField from '../../Field/RefListField';
import { SystemRefListName } from '../../../api/const/ConstDefine';
import GCRawMaterialImportRequest from '../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest';

export default class GCRawMaterialScrapTable extends EntityScanViewTable {

    static displayName = 'GCRawMaterialScrapTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createHoldButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createRawMaterialScrapInput());
        return tags;
    }

    createRawMaterialScrapInput = () => {
        return  <Row gutter={12}>
            <Col span={2} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.ScrapReason)}:
                </span>
            </Col>
            <Col span={4}>
                <RefListField ref={(scrapReason) => { this.scrapReason = scrapReason }} referenceName={SystemRefListName.ScrapReason} />
            </Col>
            <Col span={2} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.remarks)}:
                </span>
            </Col>
            <Col span={4}>
                <Input ref={(remark) => { this.remark = remark }} key="remark" placeholder="报废备注"/>
            </Col>
        </Row>
    }

    scrap =() => {
        const {data} = this.state;
        let self = this;
        let remarks = this.remark.state.value;
        let scrapReason = this.scrapReason.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(scrapReason == "" || scrapReason == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseChooseHoldReason));
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            materialLotList: data,
            reason: scrapReason,
            remarks: remarks,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                };
                self.scrapReason.setState({
                    value : "",
                });
                self.remark.setState({
                    value : "",
                });
                MessageUtils.showOperationSuccess();
            }
        }
        GCRawMaterialImportRequest.sendScrapRawMaterialRequest(requestObject);
    }

    createHoldButton = () => {
        return <Button key="scrap" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.scrap}>
                        {I18NUtils.getClientMessage(i18NCode.BtnScrap)}
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