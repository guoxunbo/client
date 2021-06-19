import { Button, Form, Switch, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import StockCheckOutForm from './StockCheckOutForm';
import StockOutCheckRequest from '../../../api/gc/stock-out-check/StockOutCheckRequest';
import Icon from '@icedesign/icon';

const StockOutCheckTableName="GCStockOutCheck";

export default class StockOutCheckTable extends EntityScanViewTable {

    static displayName = 'StockOutCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state,...{checked:true},...{value: "check"},...{formTable: {fields: []}}};
    }

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else if(record.trueFlag){
            return 'scaned-row';
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
        buttons.push(this.createJudgeOkButton());
        buttons.push(this.createJudgeNgButton());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createCheckExpressFlag());
        tagList.push(this.createStatistic());
        tagList.push(this.createErrorNumberStatistic());
        return tagList;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

    createCheckExpressFlag = () => {
        return <span style={{display: 'flex'}}>
            <span style={{marginLeft:"30px", fontSize:"16px"}}>{I18NUtils.getClientMessage(i18NCode.CheckExpress)}:</span>
            <span style = {{marginLeft:"10px"}}>
                <Switch ref={(checkedChildren) => { this.checkedChildren = checkedChildren }} 
                        checkedChildren={<Icon type="check" />} 
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
                value: "check",
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

    createForm = () => {
        const WrappedAdvancedStockCheckOutForm = Form.create()(StockCheckOutForm);
        return  <WrappedAdvancedStockCheckOutForm checkItemList={this.props.checkItemList} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.judgeSuccess} onCancel={this.handleCancel} />
    }

    judgeSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        MessageUtils.showOperationSuccess();
    }

    judgeOk = () => {
        let datas = this.state.data;
        let self = this;
        let checkExpressFlag = self.state.value;
        let chenkfalg = false;
        if (datas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(self.getErrorCount() > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        if(checkExpressFlag == "check"){
            chenkfalg = this.validateMLotNotCheckExpress(chenkfalg);
        }
        if(chenkfalg){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.MLotUnCheckExpressNumber));
            return;
        }
        let object = {
            materialLots : this.state.data,
            success: function(responseBody) {
                self.judgeSuccess();
            }
        }
        StockOutCheckRequest.sendJudgeMaterialLotRequest(object);
    }

    judgeNg = () => {
        const {data} = this.state;
        let self = this;
        let checkExpressFlag = self.state.value;
        let chenkfalg = false;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }

        if(self.getErrorCount() > 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        if(checkExpressFlag == "check"){
            chenkfalg = this.validateMLotNotCheckExpress(chenkfalg);
        }
        if(chenkfalg){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.MLotUnCheckExpressNumber));
            return;
        }
        let requestObject = {
            name: StockOutCheckTableName,
            success: function(responseBody) {
                self.setState({
                    formTable: responseBody.table,
                    formVisible : true,
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    validateMLotNotCheckExpress(chenkfalg){
        let materialLots = this.state.data;
        materialLots.forEach(data => {
            if(!data.trueFlag){
                chenkfalg = true;
            }
        });
        return chenkfalg;
    }

    createJudgeOkButton = () => {
        return <Button key="OK" type="primary" style={styles.tableButton} icon="inbox" onClick={this.judgeOk}>
                        OK
                    </Button>
    }

    createJudgeNgButton = () => {
        return <Button key="NG" type="primary" style={styles.tableButton} icon="inbox" onClick={this.judgeNg}>
                        NG
                    </Button>
    }
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
