import {Button} from 'antd';
import UserManagerRequest from '@api/user-manager/UserManagerRequest';
import I18NUtils from "@api/utils/I18NUtils";
import { i18NCode } from "@api/const/i18n";
import UserForm from "@components/security/form/UserForm";
import {Form} from 'antd';
import EntityListTable from "@components/framework/table/EntityListTable";
import NoticeUtils from '@utils/NoticeUtils';

export default class UserTable extends EntityListTable {

    static displayName = 'UserTable';

    constructor(props) {
        super(props);
    }

    createForm = () => {
        const WrappedAdvancedEntityForm = Form.create()(UserForm);
        return  <WrappedAdvancedEntityForm ref={this.formRef} object={this.state.editorObject} visible={this.state.formVisible} 
                                            table={this.state.table} onOk={this.refresh} onCancel={this.handleCancel} />
    }

    resetPassword = () => {
        const {selectedRows} = this.state;
        const self = this;
        if (selectedRows) {
            if (selectedRows.length != 1) {
                NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectOneRow));
                return;
            } 
            let object = {
                username: selectedRows[0].username,
                success: function(responseBody) {
                    self.refresh(responseBody.user);
                }
            }
            UserManagerRequest.sendResetPassword(object);
        }
    }

    handleUpload = (option) => {
        UserManagerRequest.sendImportRequest(option.file);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createAddButton());
        buttons.push(this.createImportButton());
        buttons.push(this.createExportDataAndTemplateButton());
        buttons.push(<Button key="resetPwd" type="primary" className="table-button" icon="lock" onClick={() => this.resetPassword()}>{I18NUtils.getClientMessage(i18NCode.BtnResetPassword)}</Button>);
        return buttons;
    }

}


