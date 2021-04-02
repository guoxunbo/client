import  React from 'react';
import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import GcRwStockOutTagMLotShowTable from './GcRwStockOutTagMLotShowTable';
import RwMLotManagerRequest from '../../../api/gc/rw-manager/RwMLotManagerRequest';

export default class RWStockOutTagMLotForm extends EntityForm {

    static displayName = 'RWStockOutTagMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
    }

    handleOk= () => {
        let self = this;
        let customerName = this.materialLotTable.customerName.state.value;
        let abbreviation = this.materialLotTable.abbreviation.state.value;
        let remarks = this.materialLotTable.remarks.state.value;

        if(customerName == "" || customerName == null ||  customerName == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.CustomerIdentificaionCannotEmpty));
            return;
        }
        let materialLots = this.props.materialLots;
        let requestObj = {
            materialLotList : materialLots,
            abbreviation : abbreviation,
            customerName : customerName,
            remarks : remarks,
            success: function(responseBody) {
                self.props.onOk();
            }
        }
        RwMLotManagerRequest.sendRwStockOutTagRequest(requestObj);
    }

    buildForm = () => {
        return (<GcRwStockOutTagMLotShowTable ref={(materialLotTable) => { this.materialLotTable = materialLotTable }} rowKey={DefaultRowKey} 
                                        materialLots={this.props.materialLots}
                                        visible={this.props.visible} />);
    }
}

RWStockOutTagMLotForm.propTypes={
}

