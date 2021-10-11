import EntityScanViewTable from '../EntityScanViewTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Input, Row, Col, Button } from 'antd';
import { Application } from '../../../api/Application';
import { Notification } from '../../notice/Notice';


export default class MobileOldRecordExpressNumberTable extends EntityScanViewTable {

    static displayName = 'MobileOldRecordExpressNumberTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
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

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.searchBtn());
        buttons.push(this.createExpressInput());
        return buttons;
    }

    componentDidMount=() => {
        this.expressNumber.focus();
    }
    
    createExpressInput = () => {
        return  <Row gutter={19}>
            <Col span={16}>
                <Input ref={(expressNumber) => { this.expressNumber = expressNumber }} 
                        key="expressNumber" 
                        placeholder={I18NUtils.getClientMessage(i18NCode.ExpressNumber)}
                        onPressEnter={this.onExpressInput}/>
            </Col>
        </Row>
    }

    queryData = () => {
        let self = this;
        self.props.queryFrom.handleSearch();
    }

    searchBtn = () => {
        return <Button key="queryData" type="primary" style={styles.tableButton} onClick={this.queryData}>{I18NUtils.getClientMessage(i18NCode.BtnSearch)}</Button>
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
        if(recordCount == datas.length){
            Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DocumentHasBeenBoundToTheExpress));
            this.expressNumber.setState({value:""})
            return;
        }
        datas[recordCount].expressNumber = expressNumber;
        datas.splice(recordCount, 1, datas[recordCount]);
        recordCount = recordCount + 1;
        this.expressNumber.setState({value:""})
        this.setState({
            data: datas,
            recordCount: recordCount
        });
    }

    buildOperationColumn = () => {
        
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
