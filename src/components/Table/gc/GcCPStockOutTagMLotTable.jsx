import {Input, Row, Col, Tag, Form } from 'antd';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import EntityListTable from '../EntityListTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import RefListField from '../../Field/RefListField';
import { i18NCode } from '../../../api/const/i18n';
import { SystemRefListName, RefTableName } from '../../../api/const/ConstDefine';
import RefTableField from '../../Field/RefTableField';
import "../../Form/QueryForm.scss";
import FormItem from 'antd/lib/form/FormItem';


/**
 * CP出货标注表格
 */
export default class GcCPStockOutTagMLotTable extends EntityListTable {

    static displayName = 'GcCPStockOutTagMLotTable';
    
    componentWillReceiveProps = (props) => {
        const {visible, materialLots} = props;
        let self = this;
        if (visible) {
            self.setState({
                data: materialLots
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
        const {visible, materialLots} = this.props;
        let self = this;
        if (visible) {
            self.setState({
                data: materialLots
            })
        }
    }

    componentDidMount = () => {
        const self = this;
        self.getMaterialLotList();
        let requestObject = {
            tableRrn: 460808,
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
        tags.push(this.createBoxQty());
        tags.push(this.createWaferNumber());
        tags.push(this.createTotalNumber());
        return tags;
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

    createExpressInput = () => {
        return  <FormItem>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.CustomerName)}:</span>
                        </Col>
                        <Col span={8}>
                            <RefTableField ref={(customerName) => { this.name = customerName }} field = {{refTableName : RefTableName.CustomerNameList, name: "customerName"}}/>
                        </Col>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.StockOutType)}:</span>
                        </Col>
                        <Col span={8}>
                            <RefListField ref={(stockOutType) => { this.stockOutType = stockOutType }} referenceName={SystemRefListName.StockOutType} />
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>PO：</span>
                        </Col>
                        <Col span={8}>
                            <RefTableField ref={(poId) => { this.poId = poId }} field = {{refTableName : RefTableName.CPPoListByMaterialNameAndVender}}/>
                        </Col>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.PoName)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(PoName) => { this.PoName = PoName }} key="PoName"  placeholder="Po名称" />
                        </Col>
                    </Row>
                    {/* <Row gutter={12}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.ProductId)}:</span>
                        </Col>
                        <Col span={8}>
                            <RefTableField ref={(materialName) => { this.materialName = materialName }} disabled={true}  value={this.props.materialName} field={{refTableName : RefTableName.GCWaferMaterialByName, name: "materialName"}}/>
                        </Col>
                    </Row> */}
                </FormItem>
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
