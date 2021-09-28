import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import VcCheckTable from "@components/vc/table/VcCheckTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityScanProperties from "../framework/EntityScanProperties";

/**
 * 盘点
 */
export default class VcCheckProperties extends EntityScanProperties{

      static display = 'VcCheckProperties';

      buildTable = () => {
         return <VcCheckTable {...this.getDefaultTableProps()}
                     pagination={false} 
                     scrollY={200} />
      }
      
      queryData = (whereClause) => {
         const self = this;
         if(whereClause == ""){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseInputQueryCondition))
            this.setState({loading: false,});
            return
         }
         let queryFields = self.form.state.queryFields;
         for (let queryField of queryFields) {
            this.customFieldEnterEvent(queryField, whereClause);
         }
         this.setState({loading: false});
      }

      customFieldEnterEvent = (queryField, whereClause) => {
         if (queryField.name === "lastWarehouseId") {
            this.warehouseEnterEvent(queryField, whereClause);
         }
         if (queryField.name === "materialName") {
            this.warehouseEnterEvent(queryField, whereClause);
         }

         if (queryField.name === "materialLotId") {
            this.mLotIdEnterEvent(queryField);
         }

         if (queryField.name === "transQty") {
            this.actualQtyEnterEvent(queryField);
         }
      }

      warehouseEnterEvent = (queryField, whereClause)=>{
         let self = this;
         let queryFieldName = self.form.props.form.getFieldValue(queryField.name);
         if(!queryFieldName){
            return;
         }
         let requestObject = {
            tableRrn: this.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
               self.setState({
                  tableData: responseBody.dataList,
                  loading: false,
                  whereClause: whereClause
                });
            }
         }
         TableManagerRequest.sendGetDataByRrnRequest(requestObject);
         self.form.props.form.setFieldsValue({
            lastWarehouseId:"",
            materialName: ""
         });
         document.getElementById("materialLotId").focus();
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
         let tableData = this.state.tableData;
         let scandMaterialLot = undefined;
         let showData = [];
         tableData.map((mLot, index) => {
            if (mLot.materialLotId == objectFrom.materialLotId) {
                mLot.transQty = transQty;
                scandMaterialLot = mLot;
                mLot.scanedFlag = true;
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