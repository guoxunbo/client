import VcFinishGoodScanTable from "@components/vc/table/VcFinishGoodScanTable";
import { i18NCode } from "@const/i18n";
import EntityScanProperties from "@properties/framework/EntityScanProperties";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";

export default class VcFinishGoodScanProperties extends EntityScanProperties{

    static displayName =  'VcFinishGoodScanProperties';

    constructor (props){
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }

    queryData = (whereClause) => {
        const self = this;
        let mLots= this.state.tableData;
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let flag = false;
        let materialLot = '';
        if(mLots){
          mLots.forEach(mLot => {
              if(queryMLotId === mLot.materialLotId){
                flag = true ;
                mLot.scaned = true;
                materialLot = mLot;
              }
          });
          if(!flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotNonentity));
          }
          if(materialLot){
            if(materialLot.rowClass){
              materialLot.scaned = false;
              NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotAlreadyReceived));
            }
          }
        }
        self.form.resetFormFileds();
        self.form.state.queryFields[0].node.focus();
        self.setState({
          tableData: mLots,
          loading: false,
        });    
    }

    buildTable =()=>{
        return <VcFinishGoodScanTable
                        {...this.getDefaultTableProps()}
                        orderTable={this.props.orderTable} 
                        pagination={false} 
                        resetData={this.resetData.bind(this)}
                        resetFlag={this.state.resetFlag}
                        onSearch={this.props.onSearch} />
    }
}
