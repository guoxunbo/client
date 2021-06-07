import { Notification } from "@alifd/next";
import VcMaterialLotInventoryRequest from "@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest";
import VcStockOutMLotByOrderTable from "@components/vc/table/VcStockOutMLotByOrderTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityDoubleScanProperties from "../framework/EntityDoubleScanProperties";

/**
 * by 单据下架
 */
export default class VcStockOutMLotByOrderProperties extends EntityDoubleScanProperties{

      static display = 'VcStockOutMLotByOrderProperties';

      buildTable = () => {
         return <VcStockOutMLotByOrderTable {...this.getDefaultTableProps()} resetMLotId = {this.resetMLotId} />
      }

      customFieldEnterEvent = (queryField) => {
         if (queryField.name === "docId") {
            this.docIdEnterEvent(queryField);
         }

         if (queryField.name === "materialLotId") {
            this.mLotIdEnterEvent(queryField);
         }
      }

      docIdEnterEvent = (queryField)=>{
         let self = this;
         let docId = self.form.props.form.getFieldValue(queryField.name);
         if(!docId){
            return;
         }
         let requestObject={
            documentId: docId,
            success: function(responseBody) {
               self.setState({ 
                  tableData: responseBody.materialLots,
               });
               if(responseBody.materialLots.length === 0){
                  NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
               }
            }
         }
         VcMaterialLotInventoryRequest.sendGetStockOutMLotByOrderRequest(requestObject);
         self.form.props.form.setFieldsValue({
            docId:"",
         });
         document.getElementById("materialLotId").focus();
      }
         
      mLotIdEnterEvent = (queryField)=>{
         let materialLotId = this.form.props.form.getFieldValue(queryField.name);
         if(!materialLotId){
            return;
         }
         let tableData = this.state.tableData;
         let scandMaterialLot = undefined;
         let showData = [];
         tableData.map((materialLot, index) => {
            if (materialLot.materialLotId == materialLotId) {
                materialLot.scaned = true;
                scandMaterialLot = materialLot;
                showData.unshift(materialLot);
            }else {
                showData.push(materialLot);
            }
         });

         if (!scandMaterialLot) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
            this.resetMLotId();
         }
         this.setState({
            tableData: showData,
         });
         document.getElementById("materialLotId").focus();
      }

      resetMLotId = () =>{
         this.form.props.form.setFieldsValue({
            materialLotId:"",
         });
         document.getElementById("materialLotId").focus();
      }

      queryData = (whereClause) => {
         const self = this;
         if(whereClause == ""){
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.PleaseInputQueryCondition))
            this.setState({
               loading: false,
            });
            return
         }
         let queryFields = self.form.state.queryFields;
         for (let queryField of queryFields) {
            this.customFieldEnterEvent(queryField);
         }
         this.setState({
            loading: false,
         });
      }

}