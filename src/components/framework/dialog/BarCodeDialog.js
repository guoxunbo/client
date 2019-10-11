import  React from 'react';

import EntityDialog from '@components/framework/dialog/EntityDialog';
import BarCodeForm from '@components/framework/form/BarCodeForm';

const CodeType ={
    BarCode: "BarCode",
    QrCode: "QrCode"
}
export default class BarCodeDialog extends EntityDialog {

    static displayName = 'BarCodeDialog';

    constructor(props) {
        super(props);
    }

    handleOk= () => {
        if (this.props.type == CodeType.BarCode) {
            const win = window.open('','printwindow'); 
            win.document.write(window.document.getElementById('barcode').innerHTML);
            win.print();
            win.close();
        } else if (this.props.type == CodeType.QrCode) {
            let elink = document.createElement('a');
            elink.download = "qrcode.png";
            elink.style.display = 'none';
            elink.href = window.document.getElementById('qrCode').toDataURL();
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
        }
        this.props.onOk();
    }

    buildForm = () => {
        return <BarCodeForm type={this.props.type} value={this.props.value} />
    }
}
export {CodeType}