import EntityDoubleScanProperties from "@properties/framework/EntityDoubleScanProperties";
import UnPackMaterialLotTable from "@components/mms/table/UnPackMaterialLotTable";
import NoticeUtils from "@utils/NoticeUtils";
import I18NUtils from "@utils/I18NUtils";
import { i18NCode } from "@const/i18n";
import TableManagerRequest from "@api/table-manager/TableManagerRequest";

/**
 * 拆包
 */
export default class UnPackagaMaterialLotProperties extends EntityDoubleScanProperties{

    static displayName = 'UnPackagaMaterialLotProperties';
      
    buildTable = () => {
        return <UnPackMaterialLotTable pagination={false} {...this.getDefaultTableProps()} />
    }

    customFieldEnterEvent = (queryField, whereClause) => {
        if (queryField.name === "boxMaterialLotId") {
           this.boxMLotIdEnterEvent(queryField, whereClause);
        }

        if (queryField.name === "materialLotId") {
           this.mLotIdEnterEvent(queryField);
        }
     }

     boxMLotIdEnterEvent = (queryField, whereClause)=>{
        let boxMaterialLotId = this.form.props.form.getFieldValue(queryField.name);
        if(!boxMaterialLotId){
           return;
        }
        const self = this;
        let requestObject = {
            tableRrn: self.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
                let tableData = responseBody.dataList;
                if (tableData) {
                    self.setState({
                        tableData: tableData,
                        loading: false,
                        whereClause: whereClause
                    });
                    self.form.state.queryFields[1].node.focus();
                    self.form.resetFormFileds();
                }else{
                    NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.DataNotFound));
                }
            }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
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
           this.customFieldEnterEvent(queryField, whereClause);
        }
        this.setState({
           loading: false,
        });
     }

}