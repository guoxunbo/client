import UploadFileRequest from "@api/vc/upload-file-manager/UploadFileRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

/**
 * 文件上传
 */
export default class VcUploadFileTable extends EntityListTable {

    static displayName = 'VcUploadFileTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createImportButton());
        return buttons;
    }

    handleUpload = (option) => {
        let self = this;
        let object = {
            modelClass: this.state.table.modelClass,
            success: function(responseBody) {
                if (self.refresh) {
                    self.refresh(responseBody.fileInfo);
                }
            }
        }
        
        UploadFileRequest.sendUploadFileRequest(object, option.file);
    }
}