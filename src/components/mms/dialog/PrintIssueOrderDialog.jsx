import  React from 'react';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import PrintIssueOrderForm from '../form/PrintIssueOrderForm';


export default class PrintIssueOrderDialog extends EntityDialog {

    static displayName = 'PrintIssueOrderDialog';

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
        return <PrintIssueOrderForm
                document = {this.props.document}
                object = {this.props.object}/>
    }
}
