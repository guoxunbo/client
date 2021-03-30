import  React from 'react';
import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import GcCPStockOutTagMLotTable from './GcCPStockOutTagMLotTable';

export default class RWStockOutTagMLotForm extends EntityForm {

    static displayName = 'RWStockOutTagMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
    }

    handleOk= () => {
        debugger;
        let self = this;
        let customerName = this.materialLotTable.customerName.state.value;
        let stockOutType = this.materialLotTable.stockOutType.state.value;
        let poId = this.materialLotTable.poId.state.value;
        let address = this.materialLotTable.address.state.value;
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
            address : address,
            success: function(responseBody) {
                self.props.onOk();
                self.materialLotTable.stockOutType.setState({
                    value: ""
                });
                self.materialLotTable.poId.setState({
                    value: ""
                });
                self.materialLotTable.customerName.setState({
                    value: ""
                });
                self.materialLotTable.address.setState({
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

RWStockOutTagMLotForm.propTypes={
}

