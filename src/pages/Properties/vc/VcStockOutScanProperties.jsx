import VcStockOutScanTable from "@components/vc/table/VcStockOutScanTable";
import { i18NCode } from "@const/i18n";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

export default class VcStockOutScanProperties extends EntityScanProperties{

    static displayName =  'VcStockOutScanProperties';

    constructor (props){
        super(props);
        this.state = {...this.state};
    }

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMatlotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let flag = false;
        if(mLots){
          mLots.forEach(mLot => {
              if(queryMatlotId === mLot.materialLotId){
                flag = true ;
                mLot.scaned = true;
              }
          });
          if(!flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotNonentity));
          }
        }
        self.form.resetFormFileds();
        this.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: mLots,
          loading: false,
        });    
    }

    buildTable =()=>{
        return <VcStockOutScanTable
                        {...this.getDefaultTableProps()}
                        deliverOrderTable={this.props.deliverOrderTable} 
                        pagination={false} 
                        resetData={this.resetData.bind(this)}
                        resetFlag={this.state.resetFlag}
                        onSearch={this.props.onSearch} />
    }

}
