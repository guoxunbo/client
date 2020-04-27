import EntityDialog from '@components/framework/dialog/EntityDialog';
import { SessionContext } from '@api/Application';
import UserManagerRequest from '@api/user-manager/UserManagerRequest';
import UserLoginForm from '../form/UserLoginForm';

/**
 * 用户重新登录或者验证用户
 */
export default class UserLoginDialog extends EntityDialog {

    static displayName = 'UserLoginDialog';

    handleSave = (formObject) => {
        console.log(formObject);
        let self = this;
        let object = {  
            user: formObject,
            success: function(responseBody) {
                let user = responseBody.user;
                SessionContext.saveSessionContext(user.username, user.description, SessionContext.getOrgRrn(), SessionContext.getLanguage(), SessionContext.getAuthorities());
                if (self.props.onOk) {
                    self.props.onOk(responseBody.data);
                }
            }
        }
        UserManagerRequest.sendLoginRequest(object);
    }

    handleCancel = () => {
        window.location.href = "/";
    }

    buildForm = () => {
        return <UserLoginForm checkUserFlag={true} ref={(form) => this.entityForm = form}/>
    }
    
}


