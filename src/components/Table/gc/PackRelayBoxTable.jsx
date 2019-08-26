
import { Button, Form } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import MaterialLotManagerRequest from '../../../api/gc/material-lot-manager/MaterialLotManagerRequest';
import PackRelayBoxForm from './PackRelayBoxForm';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';

const PackRelayBoxTableName="GCPackRelayBoxManage";

export default class PackRelayBoxTable extends EntityScanViewTable {

    static displayName = 'PackRelayBoxTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createBindRelayBoxButton());
        buttons.push(this.createCancelRelayBoxButton());
        return buttons;
    }

    createForm = () => {
        const WrappedAdvancedPackRelayBoxForm = Form.create()(PackRelayBoxForm);
        return  <WrappedAdvancedPackRelayBoxForm ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.bindRelayBoxSuccess} onCancel={this.handleCancel} />
    }

    bindRelayBoxSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        MessageUtils.showOperationSuccess();
    }

    bindRelayBox = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            name: PackRelayBoxTableName,
            success: function(responseBody) {
                self.setState({
                    formTable: responseBody.table,
                    formVisible : true
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    unBindRelayBox = () => {
        debugger;
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: data,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        MaterialLotManagerRequest.sendUnBindRelaxBoxRequest(requestObject);
    }

    createBindRelayBoxButton = () => {
        return <Button key="bindRelayBox" type="primary" style={styles.tableButton} icon="inbox" onClick={this.bindRelayBox}>
                        {I18NUtils.getClientMessage(i18NCode.BtnBind)}
                    </Button>
    }

    createCancelRelayBoxButton = () => {
        return <Button key="unBindRelayBox" type="primary" style={styles.tableButton} icon="dropbox" onClick={this.unBindRelayBox}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnBind)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
