import  React from 'react';
import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import GcCPStockOutTagMLotTable from './GcCPStockOutTagMLotTable';

export default class CPStockOutTagMLotForm extends EntityForm {

    static displayName = 'CPStockOutTagMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
    }

    handleOk= () => {
        debugger;
        let self = this;
        let customerName = this.materialLotTable.customerName.state.value;
        let poName = this.materialLotTable.PoName.state.value;
        let stockOutType = this.materialLotTable.stockOutType.state.value;
        let poId = this.materialLotTable.poId.state.value;
        if(!(poName == "" || poName == null || poName == undefined)){
            poId = poName;
        }
        if(customerName == "" || customerName == null ||  customerName == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.CustomerNameCannotEmpty));
            return;
        }
        if(stockOutType == "" || stockOutType == null ||  stockOutType == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.StockOutTypeCannotEmpty));
            return;
        }
        let materialLots = this.props.materialLots;
        let stockTagNote = this.props.stockTagNote;
        let requestObj = {
            materialLots : materialLots,
            stockTagNote : stockTagNote,
            customerName : customerName,
            stockOutType : stockOutType,
            poId : poId,
            success: function(responseBody) {
                self.props.onOk();
                self.materialLotUnitTable.stockOutType.setState({
                    value: ""
                });
                self.materialLotUnitTable.poId.setState({
                    value: ""
                });
                self.materialLotUnitTable.customerName.setState({
                    value: ""
                });
                self.materialLotUnitTable.PoName.setState({
                    value: ""
                });
            }
        }
        WltStockOutManagerRequest.sendStockOutTagRequest(requestObj);
    }

    buildForm = () => {
        return (<GcCPStockOutTagMLotTable ref={(materialLotTable) => { this.materialLotTable = materialLotTable }} rowKey={DefaultRowKey} 
                                        materialLots={this.props.materialLots}
                                        stockTagNote={this.props.stockTagNote}
                                        materialName={this.props.materialName}
                                        visible={this.props.visible} />);
    }
}

CPStockOutTagMLotForm.propTypes={
}

