
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Switch } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import WaferManagerRequest from '../../../api/gc/wafer-manager-manager/WaferManagerRequest';
import Icon from '@icedesign/icon';
import { PrintServiceUrl} from '../../../api/gc/GcConstDefine';
import PrintUtils from '../../../api/utils/PrintUtils';


/**
 * 晶圆发料
 */
export default class GcWaferIssueTable extends EntityScanViewTable {

    static displayName = 'GcWaferIssueTable';

    constructor(props) {
        super(props);
        this.state = {...this.state,...{checked:true},...{value: "issueWithDoc"}};
    }

    getRowClassName = (record, index) => {
        // 如果是扫描到不存在的批次，则进行高亮显示
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
        buttons.push(this.createWaferIssue());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createIssueWithDocFlag());
        tagList.push(this.createMaterialLotsNumber());
        tagList.push(this.createWaferCount());
        tagList.push(this.createTotalNumber());
        tagList.push(this.createErrorNumberStatistic());
        return tagList;
    }

    createIssueWithDocFlag = () => {
        return <span style={{display: 'flex'}}>
            <span style={{marginLeft:"30px", fontSize:"16px"}}>{I18NUtils.getClientMessage(i18NCode.MatchErpDocLine)}:</span>
            <span style = {{marginLeft:"10px"}}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                        checkedChildren={<Icon type="issueWithDoc" />} 
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
                value: "issueWithDoc",
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

    createMaterialLotsNumber = () => {
        let materialLotUnits = this.state.data;
        let materialLotIdList = [];
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (materialLotIdList.indexOf(data.materialLotId) == -1) {
                    materialLotIdList.push(data.materialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">箱数：{materialLotIdList.length}</Tag>
    }

    createWaferCount = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">片数：{qty}</Tag>
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
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }

    issue = () => {
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        let issueWithDoc = this.state.value;
        let orderTable = this.props.orderTable;
        let orders = orderTable.state.data;
        if (issueWithDoc == "issueWithDoc" && orders.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }
        
        let materialLots = this.state.data;
        if (materialLots.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));
        let requestObject = {
            documentLines : orders,
            materialLots : materialLots,
            issueWithDoc: issueWithDoc,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                    self.props.onSearch();
                }
                let url = PrintServiceUrl.RwLotIdIssue;
                responseBody.parameterMapList.forEach((parameter) => {
                    PrintUtils.MultiPrintWithBtIbForWeb(url, parameter, 2);
                });
                MessageUtils.showOperationSuccess();
            }
        }
        WaferManagerRequest.sendWaferIssueRequest(requestObject);
    }

     /**
     * 发料
     */
    createWaferIssue = () => {
        return <Button key="issue" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.issue}>
                        发料
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
