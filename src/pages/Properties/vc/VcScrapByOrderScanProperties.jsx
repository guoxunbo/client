import ScrapMLotRequest from "@api/vc/scrap-mlot-manager/ScrapMLotRequest";
import { EditableTable } from "@components/framework/table/EditorTable";
import TableUtils from "@components/framework/utils/TableUtils";
import VcScrapByOrderScanTable from "@components/vc/table/VcScrapByOrderScanTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityProperties from "../framework/EntityProperties";

/**
 * 根据单据报废
 */
export default class VcScrapByOrderScanProperties extends EntityProperties{

      static display = 'VcScrapByOrderScanProperties';

      constructor(props) {
            super(props);
            this.state= {...this.state, ...{showQueryFormButton: false}}
      }

      resetData = () => {
            this.setState({
                selectedRowKeys: [],
                selectedRows: [],
                tableData: [],
                loading: false,
                resetFlag: true
            });
      }

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let flag = true;
        let showData = [];
        mLots.forEach(mLot => {
            if(queryMLotId === mLot.materialLotId){
                flag = false ;
                mLot.scaned = true;
                showData.unshift(mLot);
            }else{
                showData.push(mLot);
            }
        });
        if(flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.DataNotFound));
        }
        
        self.form.resetFormFileds();
        self.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: showData,
          loading: false,
        });    
    }

    buildTable = () => {
            return (<div><VcScrapByOrderScanTable
                              {...this.getDefaultTableProps()}
                              scanProperties = {this.scanProperties}
                              resetData = {this.props.resetData}
                              onSearch = {this.props.onSearch}
                              orderTable = {this.props.orderTable}/>
                    </div>)
    }     
}