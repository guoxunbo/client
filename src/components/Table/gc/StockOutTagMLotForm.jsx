import  React from 'react';

import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import MessageUtils from '../../../api/utils/MessageUtils';
import GcStockOutTagMLotUnitTable from './GcStockOutTagMLotUnitTable';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';

export default class StockOutTagMLotForm extends EntityForm {

    static displayName = 'StockOutTagMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
    }

    handleOk= () => {
        let self = this;
        let customerName = this.materialLotUnitTable.input.state.value;
        let stockOutType = this.materialLotUnitTable.stockOutType.state.value;
        let poId = this.materialLotUnitTable.poId.state.value;
        if(customerName == "" || customerName == null ||  customerName == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.CustomerNameCannotEmpty));
            return;
        }
        if(stockOutType == "" || stockOutType == null ||  stockOutType == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.StockOutTypeCannotEmpty));
            return;
        }
        // if(poId == "" || poId == null ||  poId == undefined){
        //     Notification.showNotice(I18NUtils.getClientMessage(i18NCode.PoIdCannotEmpty));
        //     return;
        // }
        let materialLots = this.props.materialLots;
        let stockTagNote = this.props.stockTagNote;
        let requestObj = {
            materialLots : materialLots,
            stockTagNote : stockTagNote,
            customerName : customerName,
            stockOutType : stockOutType,
            poId : poId,
            success: function(responseBody) {
                debugger;
                MessageUtils.showOperationSuccess();
                self.props.onOk();
                self.props.onSearch();
                self.props.resetData();
                self.materialLotUnitTable.stockOutType.setState({
                    value: ""
                });
                self.materialLotUnitTable.poId.setState({
                    value: ""
                });
            }
        }
        WltStockOutManagerRequest.sendStockOutTagRequest(requestObj);
    }

    buildForm = () => {
        return (<GcStockOutTagMLotUnitTable ref={(materialLotUnitTable) => { this.materialLotUnitTable = materialLotUnitTable }} rowKey={DefaultRowKey} 
                                        materialLots={this.props.materialLots}
                                        vender={this.props.vender}
                                        visible={this.props.visible} />);
    }
}

StockOutTagMLotForm.propTypes={
}

