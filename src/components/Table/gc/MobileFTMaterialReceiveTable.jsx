import EntityScanViewTable from '../EntityScanViewTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Col, Icon, Row, Switch, Tag } from 'antd';

export default class MobileFTMaterialReceiveTable extends EntityScanViewTable {

    static displayName = 'MobileFTMaterialReceiveTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
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

    createTagGroup = () => {
        let tags = [];
        // tags.push(this.createPrintLabelFlag());
        tags.push(this.createPieceQty());
        tags.push(this.createTotalNumber());
        tags.push(this.createErrorNumberStatistic());
        return tags;
    }

    createPrintLabelFlag = () => {
        return  <Row gutter={12}>
            <Col span={7} >
                <span style={{marginLeft:"10px", fontSize:"14px"}}>
                    {I18NUtils.getClientMessage(i18NCode.PrintWltLabelFlag)}:
                </span>
            </Col>
            <Col span={1}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                            checkedChildren={<Icon type="printLabel" />} 
                            unCheckedChildren={<Icon type="close" />} 
                            onChange={this.handleChange} 
                            disabled={this.disabled}
                            checked={this.state.checked}/>
            </Col>
        </Row>
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

    createBoxNumber = () => {
        let materialLotUnits = this.state.data;
        let lotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (lotIdList.indexOf(data.lotId) == -1) {
                    lotIdList.push(data.lotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{lotIdList.length}</Tag>
    }

    createPieceQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
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
