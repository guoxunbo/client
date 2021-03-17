import  React from 'react';

import EntityDialog from '@components/framework/dialog/EntityDialog';
import DeliveryOrderPrintFrom from '../form/DeliveryOrderPrintFrom';

export default class DeliveryOrderPrintDialog extends EntityDialog {

    static displayName = 'DeliveryOrderPrintDialog';

    constructor(props) {
        super(props);
        this.state = {...this.state };
    }

    handleOk= () => {
        const win = window.open('','printwindow'); 
        win.document.write(window.document.getElementById('printTable').innerHTML);
        win.print();
        win.close();
        this.props.onOk();
    }

    buildForm = () => {
        return <DeliveryOrderPrintFrom 
                    recordData = { this.props.recordData}
        />
    }
}
