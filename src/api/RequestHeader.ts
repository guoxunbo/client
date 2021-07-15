import { SessionContext } from "@api/Application";
// @ts-ignore
import uuid from 'react-native-uuid';

export default class RequestHeader{

    transactionId;
    messageName;
    orgName: any;
    username;
    orgRrn;
    token;
    language;

    constructor(messageName: string){
        let sessionContext = SessionContext.getSessionContext();
        this.transactionId = uuid.v4();
        this.messageName = messageName;
        this.language = SessionContext.getLanguage();
        if (sessionContext) {
            this.orgRrn = sessionContext.orgRrn;
            this.username = sessionContext.username;
            this.token = SessionContext.getToken();
        }
    }

    setOrgRrn(orgRrn: any){
        this.orgRrn = orgRrn;
    }

    setLanguage(language: any){
        this.language = language;
    }

}
