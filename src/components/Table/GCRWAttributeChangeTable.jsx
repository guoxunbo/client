import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import { Tag } from 'antd';
import EntityListCheckTable from './EntityListCheckTable';
import WltStockOutManagerRequest from '../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import MessageUtils from '../../api/utils/MessageUtils';


export default class GCRWAttributeChangeTable extends EntityListCheckTable {

    static displayName = 'GCRWAttributeChangeTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createWaferNumber());
        buttons.push(this.createTotalNumber());
        buttons.push(this.AttributeChangeButton());
        return buttons;
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createWaferNumber = () => {
        let materialLots = this.state.data;
        let qty = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentSubQty != undefined) {
                    qty = qty + parseInt(data.currentSubQty);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{qty}</Tag>
    }

    AttributeChange = () => {
        const {data} = this.state;
        let self = this;
        let materialLots = self.getSelectedRows();
        let requestObject = {
            materialLots: materialLots,
            success: function(responseBody) {
                self.setState({
                    selectedRows: [],
                    selectedRowKeys: [],
                });
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        WltStockOutManagerRequest.sendGCRWAttributeChangeRequest(requestObject);
    }

    AttributeChangeButton = () => {
        return <Button key="stockOutTag" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.AttributeChange}>
                        {I18NUtils.getClientMessage(i18NCode.BtnTagging)}
                    </Button>
    }

   buildOperationColumn = () => {

   }

   setSelectMLot = (record) => {
    let rowKey = this.props.rowKey || DefaultRowKey;
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const selectedRows = [...this.state.selectedRows];

    let checkIndex = selectedRowKeys.indexOf(record[rowKey]);
    if (checkIndex < 0) {
        selectedRowKeys.push(record[rowKey]);
        selectedRows.push(record);
    }
    this.setState({ 
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
    });
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
