import { Button, Input, Row, Col, DatePicker ,Tag} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Application } from '../../../api/Application';
import { Notification } from '../../notice/Notice';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import RefListField from '../../Field/RefListField';
import { DateFormatType, SystemRefListName } from '../../../api/const/ConstDefine';
import EventUtils from '../../../api/utils/EventUtils';
import EntityListCheckTable from '../EntityListCheckTable';
import FormItem from 'antd/lib/form/FormItem';
import locale from 'antd/lib/date-picker/locale/zh_CN';

export default class HNWarehouseRecordExpressNumberTable extends EntityListCheckTable {

    static displayName = 'HNWarehouseRecordExpressNumberTable';

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
        buttons.push(this.createStatistic());
        buttons.push(this.createManualRecordExpressButton());
        buttons.push(this.createCancelExpressButton());
        buttons.push(this.createPrintObliqueLabelButton());

        return buttons;
    }

    createExpressInput = () => {
        return <FormItem>
                  <Row gutter={16}>
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
        </FormItem>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
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
                    MessageUtils.showOperationSuccess();
                }
            }
            RecordExpressNumberRequest.sendQueryPrintParameterRequest(requestObject);
        }
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
