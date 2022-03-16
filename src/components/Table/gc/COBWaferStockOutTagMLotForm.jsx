import  React from 'react';
import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import { Notification } from '../../notice/Notice';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import RwMLotManagerRequest from '../../../api/gc/rw-manager/RwMLotManagerRequest';
import GcCOBWaferStockOutTagShowTable from './GcCOBWaferStockOutTagShowTable';

export default class COBWaferStockOutTagMLotForm extends EntityForm {

    static displayName = 'COBWaferStockOutTagMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
    }

    handleOk= () => {
        let self = this;
        let customerName = this.maLotUnitTable.customerName.state.value;
        let abbreviation = this.maLotUnitTable.abbreviation.state.value;
        let remarks = this.maLotUnitTable.remarks.state.value;

        if(customerName == "" || customerName == null ||  customerName == undefined){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.CustomerIdentificaionCannotEmpty));
            return;
        }
        let materialLotUnits = this.props.materialLotUnits;
        let requestObj = {
            materialLotUnitList : materialLotUnits,
            abbreviation : abbreviation,
            customerName : customerName,
            remarks : remarks,
            success: function(responseBody) {
                self.props.onOk();
            }
        }
        RwMLotManagerRequest.sendCOBStockOutTagRequest(requestObj);
    }

    buildForm = () => {
        return (<GcCOBWaferStockOutTagShowTable ref={(maLotUnitTable) => { this.maLotUnitTable = maLotUnitTable }} rowKey={DefaultRowKey} 
                                        materialLotUnits={this.props.materialLotUnits}
                                        visible={this.props.visible} />);
    }
}

COBWaferStockOutTagMLotForm.propTypes={
}

