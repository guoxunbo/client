
import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { Notification } from '../../notice/Notice';
import { i18NCode } from '../../../api/const/i18n';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityScanViewTable from '../EntityScanViewTable';
import EventUtils from '../../../api/utils/EventUtils';

export default class MesReceiveFGScanTable extends EntityScanViewTable {

    static displayName = 'MesReceiveFGScanTable';

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
        buttons.push(this.createQueryLSGradeButton());
        buttons.push(this.createReceiveLSGradeButton());
        buttons.push(this.createDeleteAllButton());
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createStatistic());
        tagList.push(this.createErrorNumberStatistic());
        return tagList;
    }

    receive = () => {
        debugger;
        const {data} = this.state;
        let self = this;
        if (this.getErrorCount() > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        if (self.validateMLotExistLSGrade()) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.CannotReceiveLSGradeVBox));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        if (data && data.length > 0) {
            let self = this;
            let requestObject = {
                mesPackedLots: data,
                success: function(responseBody) {
                    if (self.props.resetData) {
                        self.props.onSearch();
                        self.props.resetData();
                    }
                    self.setState({
                        loading: false
                    }); 
                    MessageUtils.showOperationSuccess();
                }
            }
            FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
        }
    }

    LSGradeQuery = () => {
        const {data, table} = this.state;
        let self = this;
        if (data && data.length > 0) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.DataIsNotNullPleaseReceive));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        let requestObject = {
            tableRrn: table.objectRrn,
            success: function(responseBody) {
                let packedLotList = responseBody.packedLotList;
                if (packedLotList && packedLotList.length > 0) {
                    self.setState({
                        data: packedLotList,
                        loading: false
                    }); 
                    MessageUtils.showOperationSuccess();
                } else {
                    Notification.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound));
                }
            }
        }
        FinishGoodInvManagerRequest.sendLSGeadeQueryRequest(requestObject);
    }



    LSGradeReceive = () => {
        debugger;
        const {data} = this.state;
        let self = this;
        if (self.validateMLotExistUnLSGrade()) {
            Notification.showError(I18NUtils.getClientMessage(i18NCode.LSGradeVBoxCanDoLSReceive));
            return;
        }
        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        
        if (data && data.length > 0) {
            let self = this;
            let requestObject = {
                mesPackedLots: data,
                success: function(responseBody) {
                    if (self.props.resetData) {
                        self.props.onSearch();
                        self.props.resetData();
                    }
                    self.setState({
                        loading: false
                    }); 
                    MessageUtils.showOperationSuccess();
                }
            }
            FinishGoodInvManagerRequest.sendLSGeadeReceiveRequest(requestObject);
        }
    }

    validateMLotExistLSGrade(){
        let flag = false;
        let materialLots = this.state.data;
        materialLots.forEach(data => {
            let grade = data.grade;
            if(grade && grade == "LS"){
                flag = true;
            }
        });
        return flag;
    }

    validateMLotExistUnLSGrade(){
        let flag = false;
        let materialLots = this.state.data;
        materialLots.forEach(data => {
            let grade = data.grade;
            if(grade == undefined || grade != "LS"){
                flag = true;
            }
        });
        return flag;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
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

    createDeleteAllButton = () => {
        return <Button key="deleteAll" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.deleteAllMaterialLot}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDeleteAll)}
                    </Button>
    }

    deleteAllMaterialLot = () => {
        let self = this;
        if( self.props.data.length == 0){
            return;
        } else {
            self.props.resetData();
            MessageUtils.showOperationSuccess();
        }
    }

    createReceiveButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="import" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

    createQueryLSGradeButton = () => {
        return <Button key="lsGradeQuery" type="primary" style={styles.tableButton} loading={this.state.loading} icon="plus" onClick={this.LSGradeQuery}>
                        {I18NUtils.getClientMessage(i18NCode.BtnLSGradeQuery)}
                    </Button>
    }

    createReceiveLSGradeButton = () => {
        return <Button key="lsGradeReceive" type="primary" style={styles.tableButton} loading={this.state.loading} icon="import" onClick={this.LSGradeReceive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnLSGradeReceive)}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
