import EntityListTable from "../EntityListTable";
import { Button, Row, Col,Tag } from 'antd';
import RefListField from '../../Field/RefListField';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import PrintUtils from '../../../api/utils/PrintUtils';
import { Notification } from '../../notice/Notice';
import GetMLotCodePrintParameterRequest from "../../../api/gc/get-print-mlot-parameter/GetMLotCodePrintParameterRequest";
import { SystemRefListName } from "../../../api/const/ConstDefine";

export default class GCHKWarehouseMLotCodePrintTable extends EntityListTable {

    static displayName = 'GCHKWarehouseMLotCodePrintTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createExpressInput());
        tags.push(this.createMLotNumber());
        tags.push(this.createWaferCount());
        tags.push(this.createCurrentQty());
        return tags;
    }

    createExpressInput = () => {
        return  <Row gutter={8}>
            <Col span={2} >
                <span style={{marginLeft:"10px", fontSize:"19px"}}>
                    {I18NUtils.getClientMessage(i18NCode.PrintLableType)}:
                </span>
            </Col>
            <Col span={6}>
                <RefListField ref={(printType) => { this.printType = printType }} referenceName={SystemRefListName.HKPrintType} />
            </Col>
        </Row>
    }

    printLable = () => { 
        debugger;
        const {data} = this.state;
        let self = this;
        let printType = this.printType.state.value;

        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(printType == "" || printType == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectPrintType));
            return;
        }

        if (data && data.length > 0) {
            self.setState({
                loading: true
            });
            EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));

            let requestObject = {
                printType: printType,
                materialLotList : data,    
                success: function(responseBody) {
                    responseBody.parameterMapList.forEach((parameter) => {
                        let printCount = parameter.printCount;
                        let portId = parseInt(parameter.portId);
                        let url = "http://127.0.0.1:" + portId + "/Integration/wms-print-MLotCode/Execute";
                        PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, parseInt(printCount));
                    });
                    MessageUtils.showOperationSuccess();
                }
            }
            GetMLotCodePrintParameterRequest.sendGetPrintParameterRequest(requestObject);
        }
    }

    createMLotNumber = () => {
        let materialLotList = this.state.data;
        let materialLotLists = [];
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                if (materialLotList.indexOf(data.materialLotId) == -1) {
                    materialLotLists.push(data.materialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{materialLotLists.length}</Tag>
    }

    createCurrentQty = () => {
        let materialLotList = this.state.data;
        let count = 0;
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createWaferCount = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" style={styles.tableButton} loading={this.state.loading} icon="print" onClick={this.printLable}>
                        {I18NUtils.getClientMessage(i18NCode.PrintLable)}
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