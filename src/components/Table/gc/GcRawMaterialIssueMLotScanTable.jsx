
import EntityScanViewTable from '../EntityScanViewTable';
import { Button, Icon, Switch } from 'antd';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import EventUtils from '../../../api/utils/EventUtils';
import GCRawMaterialImportRequest from '../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest';

export default class GcRawMaterialIssueMLotScanTable extends EntityScanViewTable {

    static displayName = 'GcRawMaterialIssueMLotScanTable';

    constructor(props) {
        super(props);
        this.state = {...this.state,...{checked:true},...{value: "issueWithDoc"}};
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
        buttons.push(this.createIssue());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createIssueWithDocFlag());
        tagList.push(this.createMaterialLotsNumber());
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
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty*10000;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count/10000}</Tag>
    }

    rawMaterialIssue = () => {
        let self = this;
        let issueWithDoc = this.state.value;
        let orderTable = this.props.orderTable;
        let orders = orderTable.state.data;
        if (issueWithDoc == "issueWithDoc" && orders.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
            return;
        }

        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
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
            documentLineList : orders,
            materialLots : materialLots,
            issueWithDoc: issueWithDoc,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.onSearch();
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        GCRawMaterialImportRequest.sendRawMaterialIssueRequest(requestObject);
    }

    createIssue = () => {
        return <Button key="Issue" type="primary" style={styles.tableButton} loading={this.state.loading} icon="file-excel" onClick={this.rawMaterialIssue}>
                        {I18NUtils.getClientMessage(i18NCode.BtnIssue)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
