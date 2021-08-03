import  React from 'react';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import PrintReturnOrderForm from '../form/PrintReturnOrderForm';


export default class PrintReturnOrderDialog extends EntityDialog {

    static displayName = 'PrintReturnOrderDialog';

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
        return <PrintReturnOrderForm
                documentId = {this.props.documentId}
                object = {this.props.object}/>
    }
}
