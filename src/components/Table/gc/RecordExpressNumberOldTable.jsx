import EntityListTable from '../EntityListTable';
import { Button, Input, Row, Col } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Application } from '../../../api/Application';
import { Notification } from '../../notice/Notice';
import RecordExpressNumberRequest from '../../../api/gc/record-express-number/RecordExpressNumberRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

export default class RecordExpressNumberOldTable extends EntityListTable {

    static displayName = 'RecordExpressNumberOldTable';

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
        return buttons;
    }

    createExpressInput = () => {
        return  <Row gutter={16}>
            <Col span={6}>
                <Input ref={(expressNumber) => { this.expressNumber = expressNumber }} 
                        key="expressNumber" 
                        placeholder={I18NUtils.getClientMessage(i18NCode.ExpressNumber)}
                        onPressEnter={this.onExpressInput}/>
            </Col>
        </Row>
    }

    recordExpress = () => {
        let self = this;
        let datas = this.state.data;
        let recordedDatas = datas.filter((data) => data.reserved2 != undefined);
        if (recordedDatas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        let object = {
            datas : recordedDatas,
            success: function(responseBody) {
                responseBody.deliveryOrderList.forEach((deliveryOrder) => {
                    let dataIndex = -1;
                    datas.map((data, index) => {
                        if (data.objectRrn == deliveryOrder.objectRrn) {
                            dataIndex = index;
                        }
                    });
                    datas.splice(dataIndex, 1, deliveryOrder);
                });
                self.setState({
                    data: datas,
                    formVisible: false,
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                MessageUtils.showOperationSuccess();
            }
        };
        RecordExpressNumberRequest.sendOldRecordExpress(object);
    }

    onExpressInput = () => {
        let expressNumber = this.expressNumber.state.value;
        if (!expressNumber) {	
            return;	
        }
        let recordCount = this.state.recordCount;
        let datas = this.state.data;
        if(datas.length == 0){
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.NoDeliveryOrder));
            this.expressNumber.setState({value:""})
            return;
        }

        datas[recordCount].reserved2 = expressNumber;
        datas.splice(recordCount, 1, datas[recordCount]);
        recordCount = recordCount + 1;
        this.expressNumber.setState({value:""})
        this.setState({
            data: datas,
            recordCount: recordCount
        });
    }

    createRecordExpressButton = () => {
        return <Button key="recordExpress" type="primary" style={styles.tableButton} icon="inbox" onClick={this.recordExpress}>
                        {I18NUtils.getClientMessage(i18NCode.BtnRecordExpress)}
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
