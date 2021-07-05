import Request from "@api/Request";
import { UrlConstant } from "@const/ConstDefine";
import MessageUtils from "@utils/MessageUtils";
import MaterialLotReleaseRequestBody from "./MaterialLotReleaseRequestBody";
import MaterialLotReleaseRequestHeader from "./MaterialLotReleaseRequestHeader";


export default class MaterialLotReleaseRequest{

    static sendImportReleaseInfoRequest = (object, file) =>{
        let requestBody =  MaterialLotReleaseRequestBody.buildImportReleaseInfo(object.importTypeNbTable);
        let requestHeader = new MaterialLotReleaseRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSReleaseMateraiLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendImportData(requestObject, file); 
    }

    static sendReleaseMLot = (object) =>{
        let requestBody =  MaterialLotReleaseRequestBody.buildReleaseMaterialLot(object.waitReleaseMLotAndAction);
        let requestHeader = new MaterialLotReleaseRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.MMSReleaseMateraiLotUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        const {sendRequest} = MessageUtils();
        sendRequest(requestObject); 
    }

    
}
