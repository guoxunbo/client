import DocStockUpManagerRequest from "@api/doc-stock-up-manager/DocStockUpManagerRequest";
import DocQueryManagerRequest from "@api/mms/doc-query-manager/DocQueryManagerRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

/**
 * 备货
 */
export default class DocStockUpTable extends EntityListTable {

    static displayName = 'DocStockUpTable';

    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        let showData = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            docLineId: record.lineId,
            success: function(responseBody) {
                let materialLots = responseBody.materialLotList;
                if(materialLots){
                    showData = materialLots;
                }
                self.props.scanProperties.setState({tableData: showData})
            }
        }
        DocStockUpManagerRequest.sendGetMaterialLotListRequest(object);
    }

    buildOperationColumn = () => {
        
    }
}