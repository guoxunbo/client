import UserManagerRequestBody from "./UserManagerRequestBody";
import {Request} from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import RequestHeader from '@api/RequestHeader';


/**
 * 用户相关请求
 */
export default class UserManagerRequest {


    static sendLoginRequest = (object) => {
        let user = object.user;
        let requestBody = UserManagerRequestBody.buildLoginRequestBody(user.username, user.password);
        let requestHeader = new RequestHeader("UserManage");
        requestHeader.setOrgRrn(user.org);
        requestHeader.setLanguage(user.language);
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.UserLoginUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendChangePassword = (object) => {
        let requestBody = UserManagerRequestBody.buildChangePwdBody(object.username, object.password, object.newPassword);
        let requestHeader = new RequestHeader("UserManage");
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.UserManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendResetPassword = (object) => {
        let requestBody = UserManagerRequestBody.buildResetPwdBody(object.username);
        let requestHeader = new RequestHeader("UserManage");
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.UserManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendMergeUserRequest = (object) => {
        let requestBody = UserManagerRequestBody.buildMergeUserBody(object.user);
        let requestHeader = new RequestHeader("UserManage");
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.UserManagerUrl);
        let requestObject = {
            request: request,
            success: object.success,
            requestHeader: requestHeader
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject);
    }

    static sendImportRequest = (file) => {
        let requestBody = UserManagerRequestBody.buildImport();
        let requestHeader = new RequestHeader("UserManage");
        // @ts-ignore
        let request = new Request(requestBody, UrlConstant.UserImportUrl);
        let requestObject = {
            request: request,
            requestHeader: requestHeader
        }
        const {sendImportData} = MessageUtils();
        sendImportData(requestObject, file);
    }

}
