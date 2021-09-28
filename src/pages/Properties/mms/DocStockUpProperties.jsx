import { Button } from "@alifd/next";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import EntityListTable from "@components/framework/table/EntityListTable";
import MaterialLotSplitDialog from "@components/mms/dialog/MaterialLotSplitDialog";
import DocStockUpTable from "@components/mms/table/DocStockUpTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityProperties from "../framework/EntityProperties";
import EntityViewProperties from "../framework/EntityViewProperties";
import DocStockUpScanProperties from "./DocStockUpScanProperties";

/**
 *单据备货
 */
export default class DocStockUpProperties extends EntityProperties{

    static displayName = 'DocStockUpProperties';
  
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });

        this.scanProperties.setState({
            selectedRowKeys: [],
            selectedRows: [],
            tableData: [],
            loading: false,
            resetFlag: true
          });
    } 

    buildSearch= () =>{
        this.handleSearch(this.state.whereClause)
    }

    buildTable = () => {
        return  <DocStockUpTable {...this.getDefaultTableProps()}
                    pagination={false} 
                    scrollY={200} 
                    ref = {(orderTable) => {this.orderTable = orderTable}}
                    scanProperties = {this.scanProperties}/>
    }

    buildOtherComponent = () => {
        return <DocStockUpScanProperties
                    tableRrn = {this.state.parameters.parameter1}  
                    orderTable = {this.orderTable} 
                    resetFlag = {this.state.resetFlag}
                    onSearch = {this.buildSearch.bind(this)}
                    ref={(scanProperties) => { this.scanProperties = scanProperties }}/>
    }

    
}