import  React from 'react';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import PrintPickOrderForm from '../form/PrintPickOrderForm';

/**
 * 领料单打印
 */
export default class PrintPickOrderDialog extends EntityDialog {

    static displayName = 'PrintPickOrderDialog';

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
        return <PrintPickOrderForm
                document = {this.props.document}
                object = {this.props.object}/>
    }
}
