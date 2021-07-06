import { Col, Icon, Input, Row, Switch, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import FormItem from 'antd/lib/form/FormItem';
import EntityScanViewTable from '../EntityScanViewTable';
import MessageUtils from '../../../api/utils/MessageUtils';

/**
 * WLT、CP完成品产线入库
 */
export default class MobileFGLotStockInTable extends EntityScanViewTable {

    static displayName = 'MobileFGLotStockInTable';

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
        // buttons.push(this.createPrintLabelFlag());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createErrorNumberStatistic());
        return buttons;
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
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

    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let cstIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (cstIdList.indexOf(data.cstId) == -1) {
                    cstIdList.push(data.cstId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{cstIdList.length}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.quantity != undefined) {
                    count = count + data.quantity;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createPrintLabelFlag = () => {
        return  <FormItem>
                    <Row gutter={12}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.PrintWltLabelFlag)}:</span>
                        </Col>
                        <Col span={1}>
                            <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                                        checkedChildren={<Icon type="printLabel" />} 
                                        unCheckedChildren={<Icon type="close" />} 
                                        onChange={this.handleChange} 
                                        disabled={this.disabled}
                                        checked={this.state.checked}/>
                        </Col>
                        <Col span={3} >
                            <span>{I18NUtils.getClientMessage(i18NCode.PrintCount)}:</span>
                        </Col>
                        <Col span={3}>
                            <Input ref={(printCount) => { this.printCount = printCount }} defaultValue={2} key="printCount" placeholder="打印份数"/>
                        </Col>
                    </Row>
        </FormItem>
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

    refreshDelete = (records) => {
        let datas = this.state.data;
        let recordList = [];
        if (!(records instanceof Array)) {
            let cstId = records.cstId;
            datas.forEach((item) => {
                if(item.cstId == cstId){
                    recordList.push(item);
                }
            });
        } else {
            recordList = records;
        }
        recordList.forEach((record) => {
            let dataIndex = datas.indexOf(record);
            if (dataIndex > -1 ) {
                datas.splice(dataIndex, 1);
            }
        });
        this.setState({
            data: datas,
            selectedRows: [],
            selectedRowKeys: []
        })
        MessageUtils.showOperationSuccess();
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
