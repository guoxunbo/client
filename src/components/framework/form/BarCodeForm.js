import  React from 'react';

import EntityForm from '@components/framework/form/EntityForm';
import SimpleBarCode from '@components/framework/code/SimpleBarCode';
import QRCode from 'qrcode.react';
import * as PropTypes from 'prop-types';
import { Form } from 'antd';

/**
 * 展示一维码和二维码的Form
 */
const CodeType ={
    BarCode: "BarCode",
    QrCode: "QrCode"
}
class BarCodeForm extends EntityForm {

    static displayName = 'BarCodeForm';

    constructor(props) {
        super(props);
    }

    buildForm = () => {
        if (this.props.type == CodeType.BarCode) {
            return this.buildBarCode();
        } else if (this.props.type == CodeType.QrCode) {
            return this.buildQrCode();
        }
    }

    buildQrCode = () => {
        return (<QRCode id="qrCode" value={this.props.value} size={250}></QRCode>)
    }

    buildBarCode = () => {
        return (
            <div id="barcode">
                <SimpleBarCode value={this.props.value}></SimpleBarCode>
            </div>)
    }
}

BarCodeForm.propTypes={
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}
export default Form.create()(BarCodeForm);

export {CodeType}