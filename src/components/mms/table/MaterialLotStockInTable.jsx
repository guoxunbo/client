
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import TableManagerRequest from '@api/table-manager/TableManagerRequest';
import MutipleMaterialLotActionDialog, { ActionType } from '@components/mms/dialog/MutipleMaterialLotActionDialog';

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
        return  <MutipleMaterialLotActionDialog action={ActionType.StockIn} ref={this.formRef} object={this.state.data} visible={this.state.formVisible} 
                                            table={this.state.formTable} onOk={this.stockInSuccess} onCancel={this.handleCancel} />
    }

    stockInSuccess = () => {
        this.setState({formVisible : false});
        if (this.props.resetData) {
            this.props.resetData();
        }
        NoticeUtils.showSuccess();
    }

    stockIn = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
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
        return <Button key="packCaseCheck" type="primary" className="table-button" icon="inbox" onClick={this.stockIn}>
                        {I18NUtils.getClientMessage(i18NCode.BtnStockIn)}
                    </Button>
    }

}


