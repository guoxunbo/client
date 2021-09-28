
import VcCheckByOrderScanTable from "@components/vc/table/VcCheckByOrderScanTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityScanProperties from "../framework/EntityScanProperties";

export default class VcCheckByOrderScanProperties extends EntityScanProperties{

      static display = 'VcCheckByOrderScanProperties';

      constructor(props) {
            super(props);
            this.state= {...this.state, ...{showQueryFormButton: true}}
      }

      buildTable = () => {
            return <VcCheckByOrderScanTable {...this.getDefaultTableProps()}
            onSearch = {this.props.onSearch}
            orderTable = {this.props.orderTable}/>
      }
      
      queryData = (whereClause) => {
            const self = this;
            let queryFields = self.form.state.queryFields;
            for (let queryField of queryFields) {
               this.customFieldEnterEvent(queryField, whereClause);
            }
            this.setState({loading: false});
      }
   
      customFieldEnterEvent = (queryField, whereClause) => {
            if (queryField.name === "materialLotId") {
               this.mLotIdEnterEvent(queryField);
            }
   
            if (queryField.name === "transQty") {
               this.actualQtyEnterEvent(queryField);
            }
      }
            
      mLotIdEnterEvent = (queryField) =>{
            let materialLotId = this.form.props.form.getFieldValue(queryField.name);
            if(!materialLotId){
               return;
            }
            document.getElementById("transQty").focus();
      }
   
      actualQtyEnterEvent = (queryField)=>{
            let transQty = this.form.props.form.getFieldValue(queryField.name);
            if(!transQty){
               return;
            }
            let objectFrom = this.form.props.form.getFieldsValue();
            let {tableData,rowKey} = this.state;
            let scandMaterialLot = undefined;
            let showData = [];
            tableData.map((mLot, index) => {
                  if (mLot.materialLotId == objectFrom.materialLotId) {
                        mLot.transQty = transQty;
                        scandMaterialLot = mLot;
                        mLot.scaned = true;
                        if(mLot.currentQty != transQty){
                              mLot.errorFlag = true;
                        }else{
                              mLot.errorFlag = false;
                        }
                  }else if (mLot.materialLotId != objectFrom.materialLotId && mLot.errorFlag){
                        showData.unshift(mLot);
                  }else {
                        showData.push(mLot);
                  }
            });
            if (!scandMaterialLot) {
                  NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound) + (objectFrom.materialLotId || ""));
            }else{
                  showData.unshift(scandMaterialLot);
            }
            this.setState({
                  tableData: showData,
                  loading: false,
            });
            this.resetFrom();
      }
   
      resetFrom = () =>{
            this.form.props.form.setFieldsValue({
               materialLotId: undefined,
               transQty: undefined
            });
            document.getElementById("materialLotId").focus();
      }
}