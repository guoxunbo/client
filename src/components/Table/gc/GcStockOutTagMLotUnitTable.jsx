import {Input, Row, Col, Tag } from 'antd';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import WltStockOutManagerRequest from '../../../api/gc/wlt-stock-out/WltStockOutManagerRequest';
import EntityListTable from '../EntityListTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import RefListField from '../../Field/RefListField';
import { i18NCode } from '../../../api/const/i18n';
import { SystemRefListName, RefTableName } from '../../../api/const/ConstDefine';
import RefTableField from '../../Field/RefTableField';
import "../../Form/QueryForm.scss";


/**
 * 出货标注表格
 */
export default class GcStockOutTagMLotUnitTable extends EntityListTable {

    static displayName = 'GcStockOutTagMLotUnitTable';
    
    /**
     * 重写此方法。因为当前的Table不是从props传递。
     */
    componentWillReceiveProps = (props) => {
        const {visible, materialLots} = props;
        let self = this;
        if (visible) {
            let requestObject = {
                materialLots : materialLots,
                success: function(responseBody) {
                    self.setState({
                        data: responseBody.materialLotUnitList
                    })
                }
            }
            WltStockOutManagerRequest.sendGetStockOutTagMLotUnits(requestObject);
        } else {
            self.setState({
                data: [],
                selectedRows: [],
                selectedRowKeys: []
            })
        }
    }   

    getMaterialLotUnits = () => {
        const {visible, materialLots} = this.props;
        let self = this;
        if (visible) {
            let requestObject = {
                materialLots : materialLots,
                success: function(responseBody) {
                    self.setState({
                        data: responseBody.materialLotUnitList
                    })
                }
            }
            WltStockOutManagerRequest.sendGetStockOutTagMLotUnits(requestObject);
        } else {

        }
    }

    componentDidMount = () => {
        const self = this;
        self.getMaterialLotUnits();
        let requestObject = {
            tableRrn: 79133,
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
        TableManagerRequest.sendGetByRrnRequest(requestObject);
    }

    buildOperationColumn = () => {
        
    }
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createExpressInput());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createExpressInput = () => {
        return  <Row gutter={24} className="ant-advanced-search-form">
            <Col span={3} >
                <span>{I18NUtils.getClientMessage(i18NCode.CustomerName)}:</span>
            </Col>
            <Col span={5}>
                <RefTableField ref={(customerName) => { this.customerName = customerName }} field = {{refTableName : RefTableName.CustomerNameList}} />
            </Col>
            <Col span={3} >
                <span>{I18NUtils.getClientMessage(i18NCode.StockOutType)}:</span>
            </Col>
            <Col span={5}>
                <RefListField ref={(stockOutType) => { this.stockOutType = stockOutType }} referenceName={SystemRefListName.StockOutType} />
            </Col>
            <Col span={2} >
                <span>PO:</span>
            </Col>
            <Col span={6}>
                <RefTableField ref={(poId) => { this.poId = poId }} field = {{refTableName : RefTableName.POIdList}} />
            </Col>
        </Row>
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

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}:{this.state.data.length}</Tag>
    }
}
