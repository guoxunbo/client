import EntityManagerRequest from '@api/entity-manager/EntityManagerRequest';
import CreateOrderRequest from '@api/vc/create-order-manager/CreateOrderRequest';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import { DefaultRowKey } from '@const/ConstDefine';

const CreateDocType = {
    document:"document",
    documentLine:"documentLine",
}
export {CreateDocType}

/**
 * 单据创建的弹框
 */
export default class VcCreateOrderDialog extends EntityDialog {

    static displayName = 'VcCreateOrderDialog';

    handleSave = (formObject) => {
        let self = this;
        if(formObject[DefaultRowKey]){
            let object = {
                modelClass: this.props.table.modelClass,
                values: formObject,
                tableRrn: this.props.table.objectRrn,
                success: function(responseBody) {
                    if (self.props.onOk) {
                        self.props.onOk(responseBody.data);
                    }
                }
            };
            EntityManagerRequest.sendMergeRequest(object);
        }else{
            let docType = this.props.docType;                                                
            if(CreateDocType.document == docType){
                this.addDocument(formObject)
            }
            if(CreateDocType.documentLine == docType){
                this.addDocumentLine(formObject)
            }
        }
    }

    addDocument = (formObject) =>{
        let self = this;
        let object = {
            document:formObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.document);
                }
            }
        };
        CreateOrderRequest.sendCreateOrderRequest(object);
    }

    addDocumentLine = (formObject) =>{
        let self = this;
        let object = {
            documentLine:formObject,
            success: function(responseBody) {
                if (self.props.onOk) {
                    self.props.onOk(responseBody.documentLine);
                }
            }
        };
        CreateOrderRequest.sendCreateOrderLineRequest(object);
    }
}
 
