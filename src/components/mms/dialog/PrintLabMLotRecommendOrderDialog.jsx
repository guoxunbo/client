import  React from 'react';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import PrintLabMLotRecommendOrderForm from '../form/PrintLabMLotRecommendOrderForm';

export default class PrintLabMLotRecommendOrderDialog extends EntityDialog {

    static displayName = 'PrintLabMLotRecommendOrderDialog';

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
        return <PrintLabMLotRecommendOrderForm
                documentId = {this.props.documentId}
                object = {this.props.object}/>
    }
}
