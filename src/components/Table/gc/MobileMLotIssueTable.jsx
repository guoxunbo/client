import { Col, DatePicker, Row, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import FormItem from 'antd/lib/form/FormItem';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { DateFormatType } from '../../../api/const/ConstDefine';

export default class MobileMLotIssueTable extends EntityScanViewTable {

    static displayName = 'MobileMLotIssueTable';

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
        buttons.push(this.erpCreatedTime());
        buttons.push(this.createMaterialLotsNumber());
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createErrorNumberStatistic());
        return buttons;
    }

    erpCreatedTime = () => {
        return <FormItem>
                    <Row gutter={16}>
                        <Col span={6} >
                            <span>{I18NUtils.getClientMessage(i18NCode.erpCreatedTime)}:</span>
                        </Col>
                        <Col span={8}>
                            <DatePicker ref={(erpTime) => { this.erpTime = erpTime }} locale={locale} showTime format={DateFormatType.Date} />
                        </Col>
                    </Row>
                </FormItem>
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

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createStatistic = () => {
        let materialLotUnits = this.state.data;
        let qty = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Tag>
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
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
