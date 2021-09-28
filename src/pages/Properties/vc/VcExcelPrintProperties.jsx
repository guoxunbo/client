import EntityViewProperties from "@properties/framework/EntityViewProperties";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import { Button } from "antd";
import NoticeUtils from "@utils/NoticeUtils";
import VcPrintParameterRequest from "@api/vc/print-parameter-manager/VcPrintParameterRequest";

const PrintType = {
    PrintCoc :"PrintCoc",
    PrintPackingList: "PrintPackingList",
    PrintShippingList: "PrintShippingList",
    PrintPKList: "PrintPKList",
    PrintPackingListAndCoc: "PrintPackingListAndCoc",

    PrintDeliveryOrder: "PrintDeliveryOrder",
    PrintRSAndScrapOrder: "PrintRSAndScrapOrder",
}
/**
 * 打印标签
 */
export default class VcExcelPrintProperties extends EntityViewProperties{

    static displayName =  'VcExcelPrintProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, showQueryFormButton: false};
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
        
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPrintButton());
        return buttons;
    }

    createPrintButton = () => {
        return <Button key="printCOC" type="primary" className="table-button" icon="file-excel" onClick={this.handlePrint}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPrint)}
                    </Button>
    }

    handlePrint = () => {
        let self = this ;
        let printParameter = self.state.formObject;
        if(printParameter.length == 0){
            return[]
        }
        let printOrderType = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let documentLineId = self.form.props.form.getFieldValue(self.form.state.queryFields[1].name);
        let objectRequest={
            printOrderType: printOrderType,
            documentLineId: documentLineId,
            success:function(responseBody) {
                NoticeUtils.showSuccess()   
            }
        }

        if(PrintType.PrintCoc == printOrderType){

            VcPrintParameterRequest.sendPrintCocRequest(objectRequest);
        }else if(PrintType.PrintPackingList == printOrderType){

            VcPrintParameterRequest.sendPrintPackingListRequest(objectRequest);
        }else if(PrintType.PrintShippingList == printOrderType){

            VcPrintParameterRequest.sendPrintShippingListRequest(objectRequest);
        }else if(PrintType.PrintPKList == printOrderType){

            VcPrintParameterRequest.sendPrintPKListRequest(objectRequest);
        }else if (PrintType.PrintPackingListAndCoc == printOrderType){

            VcPrintParameterRequest.sendPrintPackingListAndCocRequest(objectRequest);
        }else if (PrintType.PrintDeliveryOrder == printOrderType){
            
            VcPrintParameterRequest.sendPrintDeliveryOrderRequest(objectRequest);
        }else if(PrintType.PrintRSAndScrapOrder == printOrderType){

            VcPrintParameterRequest.sendPrintRSAndScrapOrderRequest(objectRequest);
        }else{
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow))
        }
    }

    
}
