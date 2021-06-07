import EntityListTable from "../EntityListTable";
import { Button, Tag, Input,Modal } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from "../../../api/utils/MessageUtils";
import EventUtils from "../../../api/utils/EventUtils";
import GCRawMaterialImportRequest from "../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest";

export default class GCRawMaterialDeleteTable extends EntityListTable {

    static displayName = 'GCRawMaterialDeleteTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteButton());
        return buttons;
    }
    
    createTagGroup = () => {
        let tags = [];
        tags.push(this.createDeleteRemarkInput());
        tags.push(this.createBoxNumber());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(deleteNote) => { this.deleteNote = deleteNote }} key="deleteNote" placeholder="删除备注" />
        </div>
    }

    deleteData =() => {
        const {data,table} = this.state;
        let self = this;
        let deleteNote = this.deleteNote.state.value;
        if(data.length == 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(deleteNote == "" || deleteNote == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.DeleteNoteCannotEmpty));
            return;
        }
        for(var i=0;i<data.length;i++){
            if(data[i].state == 'In'){
                Notification.showNotice(I18NUtils.getClientMessage(i18NCode.CanNotDeleteInData));
                return;
            }
        }
        Modal.confirm({
            title: 'Confirm',
            content: I18NUtils.getClientMessage(i18NCode.ConfirmDelete),
            okText: '确认',
            cancelText: '取消',
            onOk:() => {
                self.setState({
                    loading: true
                });
                EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
                
                let requestObject = {
                    materialLotList: data,
                    deleteNote: deleteNote,
                    success: function(responseBody) {
                        self.setState({
                            data: [],
                            loading: false
                        }); 
                        MessageUtils.showOperationSuccess();
                    }
                }
                GCRawMaterialImportRequest.sendDeleteRawMaterialRequest(requestObject);
            }
        });
    }

    createBoxNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count}</Tag>
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