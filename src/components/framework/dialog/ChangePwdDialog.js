import  React from 'react';

import EntityDialog from '@components/framework/dialog/EntityDialog';
import ChangePwdForm from '@components/framework/form/ChangePwdForm';

import I18NUtils from '@api/utils/I18NUtils';
import {i18NCode} from '@api/const/i18n';
import UserManagerRequest from '@api/user-manager/UserManagerRequest';


export default class ChangePwdDialog extends EntityDialog {

    static displayName = 'ChangePwdDialog';

    compareConfirmPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    }

    compareNewPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
          callback(I18NUtils.getClientMessage(i18NCode.TwoPwdIsNotInconsistent));
        } else {
          callback();
        }
    }

    handleSave = (values) => {
        let self = this;
        let object = {
            username: values.username,
            password: values.password,
            newPassword: values.newPassword,
            success: function(){
                if (self.props.onOk) {
                    self.props.onOk();
                }
            }
        }
        UserManagerRequest.sendChangePassword(object);
    }

    buildForm = () => {
        return <ChangePwdForm ref={(form) => this.entityForm = form}></ChangePwdForm>
    }
}