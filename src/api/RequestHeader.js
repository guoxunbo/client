import { SessionContext } from "@api/Application";
// @ts-ignore
import uuid from 'react-native-uuid';

export default class RequestHeader{

    transactionId;
    /** @type {any} */
    messageName;
    /** @type {any} */
    orgName;
    username;
    orgRrn;
    token;
    /** @type {any} */
    language;

    /**
     * @param {any} [messageName]
     * @param {any} [language]
     */
    constructor(messageName,language){
        let sessionContext = SessionContext.getSessionContext();
        this.transactionId = uuid.v4();
        this.messageName = messageName;
        this.language = language;
        if (sessionContext) {
            this.orgRrn = sessionContext.orgRrn;
            this.username = sessionContext.username;
            this.token = SessionContext.getToken();
        }
    }

    /**
     * @param {any} orgRrn
     */
    setOrgRrn(orgRrn){
        this.orgRrn = orgRrn;
    }

    /**
     * @param {any} messageName
     */
    setMessageName(messageName){
        this.messageName = messageName;
    }

    /**
     * @param {any} language
     */
    setLanguage(language){
        this.language = language;
    }


}
