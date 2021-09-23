import  React from 'react';
import EntityDialog from '@components/framework/dialog/EntityDialog';
import PrintPickMlotOrderForm from '../form/PrintPickMlotOrderForm';

/**
 * 批次领料单打印传递materialName，materialDesc
 */
export default class PrintPickOrderMlotDialog extends EntityDialog {

    
    static displayName = 'PrintPickOrderMlotDialog';

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
        return <PrintPickMlotOrderForm
                document = {this.props.document}
                object = {this.props.object}/>
    }
}
