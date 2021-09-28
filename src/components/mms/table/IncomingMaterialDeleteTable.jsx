import IncomingMaterialDeleteRequest from '@api/Incoming-Material-Manager/incoming-material-delete-manager/IncomingMaterialDeleteRequest';
import AuthorityButton from '@components/framework/button/AuthorityButton';
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

    buildOperation = (record) => {
        return <Button key="edit" style={{marginRight:'1px'}} icon="edit" size="small" 
                onClick={() => this.handleEdit(record)} loading={this.state.loading}
                href="javascript:;"/>
    }


    createDeleteRemarkInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="deleteNote" placeholder={I18NUtils.getClientMessage(i18NCode.BtnRemark)} />
        </div>
    }
   
    createDeleteButton = () => {
        return <AuthorityButton key="IncomingMLotDelete" name= "IncomingMLotDelete" 
                    i18NCode={i18NCode.BtnDelete} type="primary" 
                    className="table-button" icon="delete" loading={this.state.loading}
                    onClick={() => this.deleteData()} disabled={true}/>
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
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.RemarkIsNull));
            return;
        }
        Modal.confirm({
            title: 'Confirm',
            content: I18NUtils.getClientMessage(i18NCode.ConfirmDelete),
            okText: I18NUtils.getClientMessage(i18NCode.confirm),
            cancelText: I18NUtils.getClientMessage(i18NCode.Cancel),
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
            },
        });
    }
}
const styles = {
    input: {
        width: 300,
    },
};