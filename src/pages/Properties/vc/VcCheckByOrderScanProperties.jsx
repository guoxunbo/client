
import VcMaterialLotInventoryRequest from "@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import IconUtils from "@utils/IconUtils";
import NoticeUtils from "@utils/NoticeUtils";
import { Button } from "antd";
import EntityScanProperties from "../framework/EntityScanProperties";

export default class VcCheckByOrderScanProperties extends EntityScanProperties{

      static display = 'VcCheckByOrderScanProperties';

      constructor(props) {
            super(props);
            this.state= {...this.state, ...{showQueryFormButton: true}}
      }

      tableButtonGroup = () =>{
            let buttons = [];
            buttons.push(this.createCheckButton());
            return buttons;
      }

      createCheckButton = () => {
            return <Button key="check" type="primary" className="table-button" onClick={() => this.handleCheck()}>
                              {IconUtils.buildIcon("icon-pandian")} {"盘点"}</Button>;
      }

      handleCheck = () => {
            let document = this.props.orderTable.getSingleSelectedRow();
            if(!document){
                  return;
            }
            let self = this;
            let scanedMaterialLots = this.state.tableData.filter((d) => d.scanedFlag && d.scanedFlag === true);
            if(scanedMaterialLots.length == 0){
                  NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.ScanedAtLeastOneRow));
                  return;
            }
            let requestObject = {
                  materialLots: scanedMaterialLots,
                  success: function() {
                        self.scanOrderTable.refreshDelete(scanedMaterialLots);
                  }
            }
            VcMaterialLotInventoryRequest.sendCheckInventoryRequest(requestObject);
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
   
            if (queryField.name === "actualQty") {
               this.actualQtyEnterEvent(queryField);
            }
      }
            
      mLotIdEnterEvent = (queryField) =>{
            let materialLotId = this.form.props.form.getFieldValue(queryField.name);
            if(!materialLotId){
               return;
            }
            document.getElementById("actualQty").focus();
      }
   
      actualQtyEnterEvent = (queryField)=>{
            let actualQty = this.form.props.form.getFieldValue(queryField.name);
            if(!actualQty){
               return;
            }
            let objectFrom = this.form.props.form.getFieldsValue();
            let tableData = this.state.tableData;
            let scandMaterialLot = undefined;
            let showData = [];
            tableData.map((mLot, index) => {
                  if (mLot.materialLotId == objectFrom.materialLotId) {
                        mLot.actualQty = actualQty;
                        scandMaterialLot = mLot;
                        mLot.scanedFlag = true;
                        if(mLot.currentQty != actualQty){
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
               actualQty: undefined
            });
            document.getElementById("materialLotId").focus();
      }
}