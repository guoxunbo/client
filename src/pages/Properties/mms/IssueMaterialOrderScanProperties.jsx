import MaterialLot from "@api/dto/mms/MaterialLot";
import IssueMaterialOrderRequest from "@api/issue-order-manager/issue-material-order/IssueMaterialOrderRequest";
import IssueMaterialOrderScanTable from "@components/mms/table/IssueMaterialOrderScanTable";
import { i18NCode } from "@const/i18n";
import I18NUtils from "@utils/I18NUtils";
import NoticeUtils from "@utils/NoticeUtils";
import EntityScanProperties from "../framework/EntityScanProperties";


export default class IssueMaterialOrderScanProperties extends EntityScanProperties {

    static displayName = 'IssueMaterialOrderScanProperties' ;

    constructor(props) {
        super(props);
        this.state= {...this.state, ...{showQueryFormButton: false}}
    }

    componentWillReceiveProps = (props) => {
        const {resetFlag} = props;
        if (resetFlag) {
           this.form.handleReset();
        }
    }

    queryData = (whereClause) => {
        let documentLine = this.props.orderTable.getSingleSelectedRow();
        if(documentLine == undefined){
            this.setState({ 
                loading: false,
            })
            return;
        }

        let tableData = this.state.tableData ;
        if(whereClause == undefined || whereClause == ''){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.PleaseScanOneMLot));
            this.setState({ 
                loading: false,
            })
            return;
        }

        let queryMLotId = this.form.props.form.getFieldValue(this.form.state.queryFields[0].name);
        let flag = false;   
        tableData.forEach(data => {
            if(data.materialLotId == queryMLotId){
                flag = true;
            }
        });
        if(flag){
            NoticeUtils.showInfo(I18NUtils.getClientMessage(i18NCode.MLotAlreadyScand));
            this.setState({ 
                loading: false,
            })
            return;
        }
        this.validationDocLineAndMaterialLot();
        this.setState({
            loading: false,
        });
        this.form.resetFormFileds();
        this.form.state.queryFields[0].node.focus();
    }

    validationDocLineAndMaterialLot =() => {
        let self = this;
        let queryMLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
        let documentLine = self.props.orderTable.getSingleSelectedRow();
        let showData = this.state.tableData ;
        let requestObject = {
            documentLine: documentLine,
            materialLotId: queryMLotId,
            success: function(responseBody) {
                let materialLot = responseBody.materialLotList[0];
                if(materialLot){
                    if(materialLot.status != "Wait"){
                        materialLot.errorFlag = true;
                        showData.unshift(materialLot);
                    }else{
                        showData.push(materialLot);
                   }
                }       
                self.setState({ 
                    tableData: showData,
                    loading: false,
                });
            },
        }
        IssueMaterialOrderRequest.sendValidationRequest(requestObject);
    }

    resetOrderData = (orderTable) => {
        orderTable.setState({
          data: [],
          loading: false,
          resetFlag: true
        });
    }

    buildTable = () => {
        return <IssueMaterialOrderScanTable
                          {...this.getDefaultTableProps()} 
                          orderTable={this.props.orderTable} 
                          pagination={false} 
                          resetData={this.resetData.bind(this)}
                          resetFlag={this.state.resetFlag}    
                          onSearch={this.props.onSearch}
                          />
    }
}