import IncomingMaterialReceiveScanTable from "@components/mms/table/IncomingMaterialReceiveScanTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import IncomingMaterialReceiveScanProperties from "./IncomingMaterialReceiveScanProperties";

/**
 * 来料接收
 * 实际接收数量，必须是导入的数量
 */
export default class IncomingMLotReceiveScanProperties extends IncomingMaterialReceiveScanProperties{

    static displayName = 'IncomingMLotReceiveScanProperties';
    
    queryData = (whereClause) => {
      const self = this;
      let mLots= this.state.tableData; 
      let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
      let queryQty = self.form.props.form.getFieldValue(self.form.state.queryFields[1].name);

      if(queryQty == undefined || queryQty == ''){
          this.form.state.queryFields[1].node.focus();
          this.setState({
            loading : false,
          })
          return;
      }
      let materialLot ;
      let showData = [];
      mLots.forEach(mLot => {
          if(queryMLotId === mLot.materialLotId && mLot.incomingQty == queryQty){
              mLot.currentQty = queryQty;
              materialLot = mLot;
              mLot.scaned = true;
              showData.unshift(mLot);
          }else{
              showData.push(mLot);
          } 
      })
      if(!materialLot){
        NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
      }
      self.form.resetFormFileds();
      this.form.state.queryFields[0].node.focus();
      self.setState({
        tableData: showData,
        loading: false,
      });    
  }

}