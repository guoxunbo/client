import DocQueryManagerRequest from "@api/mms/doc-query-manager/DocQueryManagerRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

export default class DocQueryManagerTable extends EntityListTable {

    static displayName = 'DocQueryManagerTable';
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExportDataAndTemplateButton());
        return buttons;
    }

    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        let showData = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        self.props.entityScanProperties.setState({tableData: showData})
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                showData = responseBody.materialLotList;
                if(showData.length != 0){
                    self.props.entityScanProperties.setState({
                        tableData: showData,
                    })
                }
            }
        }
        DocQueryManagerRequest.sendQueryMLotByOrderRequest(object);
    }

    handleDelete = (record) => {
        let object = {
            documentId:record.name,
            success: function(responseBody) {
                this.refreshDelete(record);
            }
        }
        DocQueryManagerRequest.sendDeleteDocumentRequest(object);
    } 
}