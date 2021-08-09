import EntityListTable from "../EntityListTable";
import { Button, Tag, Input,Modal } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import IncomingDeleteRequest from "../../../api/gc/incomingDelete-manager/IncomingDeleteRequest";

const TableName = {
    GCCOGDetialDelete: "GCCOGDetialDeleteTable"
}

export default class GCCOGDetialDeleteTable extends EntityListTable {

    static displayName = 'GCCOGDetialDeleteTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createDeleteRemarkInput());
        tags.push(this.createCogDetialNumber());
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="deleteNote" placeholder="删除备注" />
        </div>
    }

    deleteData =() => {
        const {data,table} = this.state;
        let self = this;
        let deleteNote = this.input.state.value;

        Modal.confirm({
            title: 'Confirm',
            content: I18NUtils.getClientMessage(i18NCode.ConfirmDelete),
            okText: '确认',
            cancelText: '取消',
            onOk:() => {
                if(data.length == 0){
                    Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
                    return;
                }
                if(deleteNote == "" || deleteNote == undefined){
                    Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DeleteNoteCannotEmpty));
                    return;
                }
                self.setState({
                    loading: true
                });
                EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
                
                let requestObject = {
                    dataList: data,
                    deleteNote: deleteNote,
                    success: function(responseBody) {
                        self.setState({
                            data: [],
                            loading: false
                        }); 
                        MessageUtils.showOperationSuccess();
                    }
                }
                IncomingDeleteRequest.sendDeleteCOGDetialRequest(requestObject);
            }
        });
    }

    createCogDetialNumber = () => {
        let CogDetials = this.state.data;
        let CogDetialList = [];
        if(CogDetials && CogDetials.length > 0){
            CogDetials.forEach(data => {
                if (CogDetialList.indexOf(data.boxbId) == -1) {
                    CogDetialList.push(data.boxbId);
                }
            });
        }
        //箱数
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{CogDetialList.length}</Tag>
    }

    createTotalNumber = () => {
        let CogDetials = this.state.data;
        let count = 0;
        if(CogDetials && CogDetials.length > 0){
            CogDetials.forEach(data => {
                count = count + data.chipQty;
            });
        }
        //颗数 
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        //包数
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    createDeleteButton = () => {
        return <Button key="delete" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.deleteData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDelete)}
                    </Button>
    }

    buildOperationColumn = () => {
        
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