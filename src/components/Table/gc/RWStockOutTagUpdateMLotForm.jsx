import  React from 'react';
import { DefaultRowKey } from '../../../api/const/ConstDefine';
import EntityForm from '../../Form/EntityForm';
import GcRwStockOutTagUpdateMLotShowTable from './GcRwStockOutTagUpdateMLotShowTable';

export default class RWStockOutTagUpdateMLotForm extends EntityForm {

    static displayName = 'RWStockOutTagUpdateMLotForm';

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
    }

    handleOk= () => {
        let self = this;
        self.props.onOk();
    }

    buildForm = () => {
        return (<GcRwStockOutTagUpdateMLotShowTable ref={(materialLotTable) => { this.materialLotTable = materialLotTable }} 
                                        rowKey={DefaultRowKey} 
                                        materialLotInfo={this.props.materialLotInfo}
                                        visible={this.props.visible} />);
    }
}

RWStockOutTagUpdateMLotForm.propTypes={
}

