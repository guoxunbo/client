import {Tag} from 'antd';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import EntityListTable from '../EntityListTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import "../../Form/QueryForm.scss";

const TableName = {
    GCRwStockOutTagUpdateMLotShow: "GCRwStockOutTagUpdateMLotShow",
}

/**
 * COB出货标注修改数量总计展示表格
 */
export default class GcRwStockOutTagUpdateMLotShowTable extends EntityListTable {

    static displayName = 'GcRwStockOutTagUpdateMLotShowTable';
    
    componentWillReceiveProps = (props) => {
        const {visible, materialLotInfo} = props;
        let self = this;
        if (visible) {
            self.setState({
                data: materialLotInfo
            })
        } else {
            self.setState({
                data: [],
                selectedRows: [],
                selectedRowKeys: []
            })
        }
    }   

    getMaterialLotList = () => {
        const {visible, materialLotInfo} = this.props;
        let self = this;
        if (visible) {
            self.setState({
                data: materialLotInfo
            })
        }
    }

    componentDidMount = () => {
        const self = this;
        self.getMaterialLotList();
        let requestObject = {
            name: TableName.GCRwStockOutTagUpdateMLotShow,
            success: function(responseBody) {
                let table = responseBody.table;
                let columnData = self.buildColumn(table);
                self.setState({
                    table: table,
                    columns: columnData.columns,
                    scrollX: columnData.scrollX,
                    loading: false
                }); 
            }
        }
        TableManagerRequest.sendGetByNameRequest(requestObject);
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createBoxQty());
        buttons.push(this.createWaferNumber());
        buttons.push(this.createTotalNumber());
        return buttons;
    }

    createBoxQty = () => {
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

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}:{count}</Tag>
    }

    buildOperationColumn = () => {
        
    }

}
