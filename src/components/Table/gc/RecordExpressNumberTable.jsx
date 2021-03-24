import { Button, Input, Row, Col, DatePicker } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Application } from '../../../api/Application';
import { Notification } from '../../notice/Notice';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import RefListField from '../../Field/RefListField';
import { DateFormatType, SystemRefListName } from '../../../api/const/ConstDefine';
import { PrintServiceUrl } from '../../../api/gc/GcConstDefine';
import EventUtils from '../../../api/utils/EventUtils';
import PrintUtils from '../../../api/utils/PrintUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import FormItem from 'antd/lib/form/FormItem';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';


export default class RecordExpressNumberTable extends EntityListCheckTable {

    static displayName = 'RecordExpressNumberTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{recordCount:0}};
    }

    componentWillReceiveProps = (props) => {
        // TODO 此处存在刷新多次问题
        let {selectedRowKeys, selectedRows} = this.state;
        let columnData = this.buildColumn(props.table);;
        
        let stateSeletcedRowKeys = selectedRowKeys.merge(props.selectedRowKeys);
        let stateSelectedRows = selectedRows.merge(props.selectedRows, this.props.rowKey);
        if (props.resetFlag) {
            stateSeletcedRowKeys = [];
            stateSelectedRows = [];
            this.expressNumber.setState({value:""})
        }
        
        this.setState({
            data: props.data,
            table: props.table,
            columns: columnData.columns,
            scrollX: columnData.scrollX,
            selectedRowKeys: stateSeletcedRowKeys || [],
            selectedRows: stateSelectedRows || [],
            pagination: props.pagination != undefined ? props.pagination : Application.table.pagination,
            recordCount: 0
        })
    }

    componentDidMount=() => {
        this.expressNumber.focus();
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExpressInput());
        buttons.push(this.createRecordExpressButton());
        buttons.push(this.createManualRecordExpressButton());
        buttons.push(this.createCancelExpressButton());
        buttons.push(this.createPrintObliqueLabelButton());

        return buttons;
    }

    createExpressInput = () => {
        return <FormItem>
                  <Row gutter={16}>
                    <Col span={2} >
                        <span>{I18NUtils.getClientMessage(i18NCode.ServiceType)}:</span>
                    </Col>
                    <Col span={4}>
                        <RefListField ref={(serviceMode) => { this.serviceMode = serviceMode }} value={"20"} referenceName={SystemRefListName.ExpressServiceMode} />
                    </Col>
                    <Col span={2} >
                        <span>{I18NUtils.getClientMessage(i18NCode.PayType)}:</span>
                    </Col>
                    <Col span={4}>
                        <RefListField ref={(payMode) => { this.payMode = payMode }}  value={"10"} referenceName={SystemRefListName.ExpressPayMode} />
                    </Col>
                    <Col span={2} >
                        <span>{I18NUtils.getClientMessage(i18NCode.ExpressCompany)}:</span>
                    </Col>
                    <Col span={4}>
                        <RefListField ref={(expressCompany) => { this.expressCompany = expressCompany }} referenceName={SystemRefListName.ExpressCompany}/>
                    </Col>
                    <Col span={2} >
                        <span>{I18NUtils.getClientMessage(i18NCode.ExpressNumber)}:</span>
                    </Col>
                    <Col span={4}>
                        <Input ref={(expressNumber) => { this.expressNumber = expressNumber }} key="expressNumber" placeholder={I18NUtils.getClientMessage(i18NCode.ExpressNumber)}/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2} >
                        <span>{I18NUtils.getClientMessage(i18NCode.OrderTime)}:</span>
                    </Col>
                    <Col span={4}>
                        <DatePicker ref={(orderTime) => { this.orderTime = orderTime }} locale={locale} showTime format={DateFormatType.DateTime} />
                    </Col>
                </Row>
        </FormItem>
    }

    recordAutoExpress = () => {
        let self = this;
        let orderTime = this.orderTime.picker.state.value;
        if(moment.isMoment(orderTime)){
            orderTime = orderTime.format("YYYY-MM-DD HH:mm");
        }

        let datas = this.getSelectedRows();
        if (datas.length === 0){
            return;
        }
        let serviceMode = this.serviceMode.state.value;
        let payMode = this.payMode.state.value;

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let object = {
            datas : datas,
            serviceMode: serviceMode,
            payMode: payMode,
            orderTime: orderTime,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    formVisible: false,
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                let url = PrintServiceUrl.ObliqueBox;
                responseBody.parameterMapList.forEach((parameter) => {
                    PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 1);
                });
                MessageUtils.showOperationSuccess();
            }
        };
        RecordExpressNumberRequest.sendAutoRecordExpress(object);
    }

    recordManualExpress = () => {
        let self = this;
        let datas = this.getSelectedRows();
        if (datas.length === 0){
            return;
        }
        let expressNumber = self.expressNumber.state.value;
        let expressCompany = self.expressCompany.state.value;
        if (expressNumber == "" || expressNumber == null || expressNumber == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.ExpressNumberCannotEmpty));
            return;
        }
        if (expressCompany == "" || expressCompany == null || expressCompany == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.ExpressCompanyCannotEmpty));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let object = {
            datas : datas,
            expressNumber: expressNumber,
            expressCompany: expressCompany,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    formVisible: false,
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                self.expressNumber.setState({
                    value : "",
                });
                MessageUtils.showOperationSuccess();
            }
        };
        RecordExpressNumberRequest.sendManualRecordExpress(object);
    }

    cancelExpress = () => {
        let self = this;
        let datas = this.getSelectedRows();
        if (datas.length === 0){
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        let object = {
            datas : datas,
            success: function(responseBody) {
                self.setState({
                    data: [],
                    formVisible: false,
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                MessageUtils.showOperationSuccess();
            }
        };
        RecordExpressNumberRequest.sendCancelRecordExpress(object);
    }

    printObliqueLabel = () => {
        let self = this;
        let datas = this.getSelectedRows();
        if (datas.length === 0){
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        
        if (datas && datas.length > 0) {
            let requestObject = {
                datas : datas,    
                success: function(responseBody) {
                    let url = PrintServiceUrl.ObliqueBox;
                    responseBody.parameterMapList.forEach((parameter) => {
                        PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 1);
                    });
                    MessageUtils.showOperationSuccess();
                }
            }
            RecordExpressNumberRequest.sendQueryPrintParameterRequest(requestObject);
        }
    }

    createRecordExpressButton = () => {
        return <Button key="recordExpress" type="primary" style={styles.tableButton} loading={this.state.loading} icon="inbox" onClick={this.recordAutoExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRecordExpress)}
                    </Button>
    }

    createPrintObliqueLabelButton = () => {
        return <Button key="print" type="primary"  style={styles.tableButton} loading={this.state.loading} icon="barcode" onClick={() => this.printObliqueLabel()}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPrintObliqueLabel)}
                    </Button>;
    }

    createManualRecordExpressButton = () => {
        return <Button key="manaulRecordExpress" type="primary" style={styles.tableButton} loading={this.state.loading} icon="inbox" onClick={this.recordManualExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnManualRecordExpress)}
                    </Button>
    }

    createCancelExpressButton = () => {
        return <Button key="cancelRecordExpress" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.cancelExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnCancelExpress)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
