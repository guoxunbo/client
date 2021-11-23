import { Col, Icon, Input, Row, Switch, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import FormItem from 'antd/lib/form/FormItem';
import EntityScanViewTable from '../EntityScanViewTable';

export default class MobileMLotStockInTable extends EntityScanViewTable {

    static displayName = 'MobileMLotStockInTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintLabelFlag());
        buttons.push(this.createStatistic());
        return buttons;
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

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}:{this.state.data.length}</Tag>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
