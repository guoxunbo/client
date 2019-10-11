import  React from 'react';

import { Form, Input, } from 'antd';
import EntityForm from '@components/framework/form/EntityForm';
import {SessionContext} from '@api/Application';
import I18NUtils from '@api/utils/I18NUtils';
import {i18NCode} from '@api/const/i18n';

const FormItem = Form.Item;

/**
 * 修改密码
 */
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
};
class ChangePwdForm extends EntityForm {

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

    buildForm = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label={I18NUtils.getClientMessage(i18NCode.Username)}>
                {getFieldDecorator('username', {initialValue: SessionContext.getUsername() })(
                    <Input disabled/>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={I18NUtils.getClientMessage(i18NCode.Password)}>
                {getFieldDecorator('password', {
                    rules: [{
                        required: true
                    }],
                })(
                    <Input type="password"/>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={I18NUtils.getClientMessage(i18NCode.NewPassword)}>
                {getFieldDecorator('newPassword', {
                    rules: [{
                        required: true
                    }, {
                        validator: this.compareConfirmPassword,
                    }],
                })(
                    <Input type="password"/>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={I18NUtils.getClientMessage(i18NCode.ConfirmPassword)}>
                {getFieldDecorator('confirmPassword', {
                    rules: [{
                        required: true
                    }, {
                        validator: this.compareNewPassword,
                    }],
                })(
                    <Input type="password"/>
                )}
                </FormItem>
            </Form>)
    }
}
export default Form.create()(ChangePwdForm);