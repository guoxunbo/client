import EntityViewProperties from "./entityProperties/EntityViewProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Button } from "antd";
import IconUtils from "../../../api/utils/IconUtils";
import { DefaultRowKey } from "../../../api/const/ConstDefine";
import { Notification } from "../../../components/notice/Notice";
import PrintUtils from "../../../api/utils/PrintUtils";
import GetPrintBboxParameterRequest from "../../../api/gc/get-print-bbox-parameter/GetPrintBboxParameterRequest";
import { PrintServiceUrl } from "../../../api/gc/GcConstDefine";
import GetPrintWltBboxParameterRequest from "../../../api/gc/get-print-wltbbox-parameter/GetPrintWltBboxParameterRequest";
import GetPrintCOBboxParameterRequest from "../../../api/gc/get-print-cobbox-parameter/GetPrintCOBboxParameterRequest";
import RwMLotManagerRequest from "../../../api/gc/rw-manager/RwMLotManagerRequest";

/**
 * 打印箱标签
 */
export default class GcPrintCaseLabelProperties extends EntityViewProperties{

    static displayName = 'PrintCaseLabelProperties';

    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true,
          formObject: []
        });
      }
    
    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) { 
            let queryDatas = responseBody.dataList;
            if (queryDatas && queryDatas.length > 0) {
                queryDatas[0].printNumber = 2;
                self.setState({
                    formObject: queryDatas[0]
                })  
                self.form.resetFormFileds();
            } else {
                self.setState({
                    formObject: []
                })  
                self.showDataNotFound();
            }
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }


    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }

    handlePrint = () => {
        let self = this;
        let materialLotRrn = this.state.formObject[DefaultRowKey];
        if (!materialLotRrn) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let packageType = this.state.formObject.packageType;
        if(packageType == "WltPackCase"){
            let requestObject = {
                materialLotRrn : materialLotRrn,    
                success: function(responseBody) {
                    let url = PrintServiceUrl.WltBbox;
                    PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, self.entityForm.getFieldValue("printNumber"));
                }
            }
            GetPrintWltBboxParameterRequest.sendQueryRequest(requestObject);
        } else if(packageType == "COBPackCase"){
            let materialLot = this.state.formObject;
            let requestObject = {
                materialLot : materialLot,      
                success: function(responseBody) {
                    let url = PrintServiceUrl.COBBox;
                    PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, self.entityForm.getFieldValue("printNumber"));
                }
            }
            GetPrintCOBboxParameterRequest.sendQueryRequest(requestObject);
        } else if(packageType == "CSTPackCase"){
            let requestObject = {
                materialLotRrn : materialLotRrn,    
                success: function(responseBody) {
                    let url = PrintServiceUrl.CSTBox;
                    PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, self.entityForm.getFieldValue("printNumber"));
                }
            }
            RwMLotManagerRequest.sendRWPrintParameterRequest(requestObject);
        }else {
            let requestObject = {
                materialLotRrn : materialLotRrn,    
                success: function(responseBody) {
                    let url = PrintServiceUrl.Bbox;
                    PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, self.entityForm.getFieldValue("printNumber"));
                }
            }
            GetPrintBboxParameterRequest.sendQueryRequest(requestObject);
        }
    }

    createPrintButton = () => {
        return <Button key="print" type="primary" onClick={() => this.handlePrint()}>
             {IconUtils.buildIcon("icon-barcode")}{I18NUtils.getClientMessage(i18NCode.BtnPrint)}</Button>;

    }
    
}

const styles = {
    buttonGroup:{
        marginBottom:'10px',
        marginRight:'30px',
        textAlign:'right'
    }
};