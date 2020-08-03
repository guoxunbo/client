import EntityListTable from '../EntityListTable';
import { Button, Input, Row, Col } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Application } from '../../../api/Application';
import { Notification } from '../../notice/Notice';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import RefListField from '../../Field/RefListField';
import { SystemRefListName } from '../../../api/const/ConstDefine';

export default class RecordExpressNumberTable extends EntityListTable {

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

        return buttons;
    }

    createExpressInput = () => {
        return  <Row gutter={16}>
            <Col span={5}>
                <RefListField ref={(serviceMode) => { this.serviceMode = serviceMode }} value={"20"} referenceName={SystemRefListName.ExpressServiceMode} />
            </Col>
            <Col span={5}>
                <RefListField ref={(payMode) => { this.payMode = payMode }}  value={"10"} referenceName={SystemRefListName.ExpressPayMode} />
            </Col>
            <Col span={6}>
                <Input ref={(expressNumber) => { this.expressNumber = expressNumber }} key="expressNumber" placeholder={I18NUtils.getClientMessage(i18NCode.ExpressNumber)}/>
            </Col>
        </Row>
    }

    recordAutoExpress = () => {
        let datas = this.state.data;
        let self = this;
        if (datas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let serviceMode = this.serviceMode.state.value;
        let payMode = this.payMode.state.value;
        let object = {
            datas : datas,
            serviceMode: serviceMode,
            payMode: payMode,
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
        RecordExpressNumberRequest.sendAutoRecordExpress(object);
    }

    recordManualExpress = () => {
        let datas = this.state.data;
        let self = this;
        if (datas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let expressNumber = this.expressNumber.state.value;
        let object = {
            datas : datas,
            expressNumber: expressNumber,
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
        RecordExpressNumberRequest.sendManualRecordExpress(object);
    }

    cancelExpress = () => {
        let datas = this.state.data;
        let self = this;
        if (datas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
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

    createRecordExpressButton = () => {
        return <Button key="recordExpress" type="primary" style={styles.tableButton} icon="inbox" onClick={this.recordAutoExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRecordExpress)}
                    </Button>
    }

    createManualRecordExpressButton = () => {
        return <Button key="manaulRecordExpress" type="primary" style={styles.tableButton} icon="inbox" onClick={this.recordManualExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnManualRecordExpress)}
                    </Button>
    }

    createCancelExpressButton = () => {
        return <Button key="cancelRecordExpress" type="primary" style={styles.tableButton} icon="delete" onClick={this.cancelExpress}>
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
