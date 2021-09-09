import EntityScanViewTable from '../EntityScanViewTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Col, DatePicker, Row, Tag, Switch } from 'antd';
import { DateFormatType } from '../../../api/const/ConstDefine';
import FormItem from 'antd/lib/form/FormItem';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import Icon from '@icedesign/icon';

export default class MobileMobileWltOrCpStockOutTable extends EntityScanViewTable {

    constructor(props) {
        super(props);
        this.state = {...this.state,...{checked:true},...{value: "checkSubCodeFlag"}};
    }

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
        buttons.push(this.createCheckSubcodeFlag());
        buttons.push(this.line());
        buttons.push(this.createStatistic());
        buttons.push(this.createWaferNumber());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createErrorNumberStatistic());
        return buttons;
    }
    
    line = () =>{
        return <br/>
    }

    createCheckSubcodeFlag = () => {
        return <span style={{display: 'flex'}}>
            <span style={{marginLeft:"30px", fontSize:"16px"}}>{I18NUtils.getClientMessage(i18NCode.CheckSubCodeFlag)}:</span>
            <span style = {{marginLeft:"10px"}}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                        checkedChildren={<Icon type="CheckSubCodeFlag" />} 
                        unCheckedChildren={<Icon type="close" />} 
                        onChange={this.handleChange} 
                        disabled={this.disabled}
                        checked={this.state.checked}/>
            </span>
        </span>
    }

    handleChange = (checkedChildren) => {
        if(checkedChildren){
            this.setState({ 
                value: "CheckSubCodeFlag",
                checked: true
            });
        } else {
            this.setState({ 
                value: "",
                checked: false
            });
        }
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

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.currentSubQty){
                    count = count + data.currentSubQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}: {count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
