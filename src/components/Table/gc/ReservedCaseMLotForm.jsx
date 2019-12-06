import  React from 'react';

import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import GcReservedCaseMLotTable from './GcReservedCaseMLotTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

export default class ReservedCaseMLotForm extends EntityForm {

    static displayName = 'ReservedCaseMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
        // this.setState({
            // tableData: tableData
        // })
    }

    handleOk= () => {
        let materialLots = this.materialLotTable.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }
        let self = this;
        let requestObj = {
            docLineRrn : this.props.docLineRrn,
            materialLots : materialLots,
            success: function(responseBody) {
                MessageUtils.showOperationSuccess();
                self.props.onOk();
            }
        }
        ReservedManagerRequest.sendReserved(requestObj);
    }

    buildForm = () => {
        return (<GcReservedCaseMLotTable ref={(materialLotTable) => { this.materialLotTable = materialLotTable }} rowKey={DefaultRowKey} 
                                        packageLots={this.props.packageLots}
                                        visible={this.props.visible} />);
    }
}

ReservedCaseMLotForm.propTypes={
}

