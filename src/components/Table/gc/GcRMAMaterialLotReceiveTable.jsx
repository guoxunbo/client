import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Col, Icon, Row, Switch } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import RmaMLotManagerRequest from '../../../api/gc/rma-mlot-manager/RmaMLotManagerRequest';
import { PrintServiceUrl } from '../../../api/gc/GcConstDefine';
import PrintUtils from '../../../api/utils/PrintUtils';

/**
 * RMA来料接收
 */
export default class GcRMAMaterialLotReceiveTable extends EntityScanViewTable {

    static displayName = 'GcRMAMaterialLotReceiveTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReceive());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createPrintLabelFlag());
        tags.push(this.createPieceQty());
        tags.push(this.createTotalNumber());
        tags.push(this.createErrorNumberStatistic());
        return tags;
    }

    createPrintLabelFlag = () => {
        return  <Row gutter={12}>
            <Col span={2} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.PrintWltLabelFlag)}:
                </span>
            </Col>
            <Col span={1}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                            checkedChildren={<Icon type="printLabel" />} 
                            unCheckedChildren={<Icon type="close" />} 
                            onChange={this.handleChange} 
                            disabled={this.disabled}
                            checked={this.state.checked}/>
            </Col>
        </Row>
    }

    handleChange = (checkedChildren) => {
        if(checkedChildren){
            this.setState({ 
                value: "printLabel",
                checked: true
            });
        } else {
            this.setState({ 
                value: "",
                checked: false
            });
        }
    }
    
    getErrorCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.errorFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createBoxNumber = () => {
        let materialLotUnits = this.state.data;
        let lotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (lotIdList.indexOf(data.lotId) == -1) {
                    lotIdList.push(data.lotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{lotIdList.length}</Tag>
    }

    createPieceQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    RmaReceive = () => {
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }

        let materialLots = this.state.data;
        if (materialLots.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        let printLabel = this.state.value;

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        let requestObject = {
            materialLots : materialLots,
            printLabel: printLabel,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                let url = PrintServiceUrl.RmaMLotId;
                responseBody.parameterMapList.forEach((parameter) => {
                    PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 1);
                });
                MessageUtils.showOperationSuccess();
            }
        }
        RmaMLotManagerRequest.sendReceiveRequest(requestObject);
    }

    createReceive = () => {
        return <Button key="receive" type="primary" 
                       style={styles.tableButton} loading={this.state.loading} 
                       icon="plus" onClick={this.RmaReceive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
