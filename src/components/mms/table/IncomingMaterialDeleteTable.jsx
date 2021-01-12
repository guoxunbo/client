import IncomingMaterialDeleteRequest from '@api/Incoming-Material-Manager/incoming-material-delete-manager/IncomingMaterialDeleteRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import { i18NCode } from '@const/i18n';
import EventUtils from '@utils/EventUtils';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Input, Button, Modal } from 'antd';

export default class IncomingMaterialDeleteTable extends EntityListTable {

    static displayName = 'IncomingMaterialDeleteTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createDeleteRemarkInput());
        buttons.push(this.createDeleteButton());
        return buttons;
    }

    buildOperationColumn = () => {
        
    }

    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="deleteNote" placeholder="删除备注" />
        </div>
    }
   
    createDeleteButton = () => {
        return <Button key="delete" type="primary" style={styles.tableButton} loading={this.state.loading} icon="delete" onClick={this.deleteData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnDelete)}
                    </Button>
    }

    deleteData =() => {
        const data = this.state.data;
        let self = this;
        let deleteNote = this.input.state.value;
        if(data.length == 0){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        if(deleteNote == "" || deleteNote == undefined){
            NoticeUtils.showNotice(I18NUtils.getClientMessage('删除备注不能为空'));
            return;
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
                        NoticeUtils.showSuccess();
                    }
                }
                IncomingMaterialDeleteRequest.sendDeleteRequest(requestObject);
            }
        });
    }


}
const styles = {
    input: {
        width: 300,
    },
};