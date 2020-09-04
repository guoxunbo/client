
import { Button, Input, Form } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityScanViewTable from '../EntityScanViewTable';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import StockCheckOutForm from './StockCheckOutForm';
import StockOutCheckRequest from '../../../api/gc/stock-out-check/StockOutCheckRequest';

const StockOutCheckTableName="GCStockOutCheck";

export default class StockOutCheckTable extends EntityScanViewTable {

    static displayName = 'StockOutCheckTable';

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExpressNumberInput());
        buttons.push(this.createJudgeOkButton());
        buttons.push(this.createJudgeNgButton());
        return buttons;
    }

    
    createExpressNumberInput = () => {
        return <div style={styles.input}>
            <Input ref={(input) => { this.input = input }} key="expressNumber" placeholder="快递单号" />
        </div>
    }

    createForm = () => {
        const WrappedAdvancedStockCheckOutForm = Form.create()(StockCheckOutForm);
        return  <WrappedAdvancedStockCheckOutForm checkItemList={this.props.checkItemList} expressNumber={this.state.expressNumber} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.judgeSuccess} onCancel={this.handleCancel} />
    }

    judgeSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
            this.setState({
                expressNumber: "",
            });
        }
        MessageUtils.showOperationSuccess();
    }

    judgeOk = () => {
        let datas = this.state.data;
        let self = this;
        let expressNumber = this.input.state.value;
        if (datas.length === 0){
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        // if(expressNumber == "" || expressNumber == null || expressNumber == undefined){
        //     Notification.showNotice(I18NUtils.getClientMessage(i18NCode.ExpressNumberCannotEmpty));
        //     return;
        // }
        let object = {
            materialLots : this.state.data,
            expressNumber: expressNumber,
            success: function(responseBody) {
                self.judgeSuccess();
            }
        }
        StockOutCheckRequest.sendJudgeMaterialLotRequest(object);
    }

    judgeNg = () => {
        const {data} = this.state;
        let self = this;
        let expressNumber = this.input.state.value;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            name: StockOutCheckTableName,
            success: function(responseBody) {
                self.setState({
                    formTable: responseBody.table,
                    formVisible : true,
                    expressNumber: expressNumber
                });
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }

    createJudgeOkButton = () => {
        return <Button key="OK" type="primary" style={styles.tableButton} icon="inbox" onClick={this.judgeOk}>
                        OK
                    </Button>
    }

    createJudgeNgButton = () => {
        return <Button key="NG" type="primary" style={styles.tableButton} icon="inbox" onClick={this.judgeNg}>
                        NG
                    </Button>
    }
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
};
