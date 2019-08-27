
import { Button, Form } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityScanViewTable from './EntityScanViewTable';
import { Notification } from '../notice/Notice';
import MessageUtils from '../../api/utils/MessageUtils';
import TableManagerRequest from '../../api/table-manager/TableManagerRequest';
import MutipleMaterialLotActionForm, { ActionType } from '../Form/MutipleMaterialLotActionForm';

const TableName="MMLotStockIn";

export default class MaterialLotStockInTable extends EntityScanViewTable {

    static displayName = 'MaterialLotStockInTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStockInButton());
        return buttons;
    }

    createForm = () => {
        const WrappedAdvancedMutipleMaterialLotActionForm = Form.create()(MutipleMaterialLotActionForm);
        return  <WrappedAdvancedMutipleMaterialLotActionForm action={ActionType.StockIn} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.stockInSuccess} onCancel={this.handleCancel} />
    }

    stockInSuccess = () => {
        debugger;
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        MessageUtils.showOperationSuccess();
    }

    stockIn = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            name: TableName,
            success: function(responseBody) {
                self.setState({
                    formTable: responseBody.table,
                    formVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    createStockInButton = () => {
        return <Button key="packCaseCheck" type="primary" style={styles.tableButton} icon="inbox" onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
