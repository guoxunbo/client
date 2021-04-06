import {Input, Row, Col, Tag, Form } from 'antd';
import TableManagerRequest from '../../../api/table-manager/TableManagerRequest';
import EntityListTable from '../EntityListTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import "../../Form/QueryForm.scss";
import FormItem from 'antd/lib/form/FormItem';

const TableName = {
    RWStockOutTagMLotShow: "GCRwMLotStockOutTagMLotShow",
}

/**
 * RW出货标注展示表格
 */
export default class GcRwStockOutTagMLotShowTable extends EntityListTable {

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
            name: TableName.RWStockOutTagMLotShow,
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

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createRwStockOutTagInput());
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

    createRwStockOutTagInput = () => {
        return  <FormItem>
                    <Row gutter={24}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.CustomerIdentificaion)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(customerName) => { this.customerName = customerName }} key="customerName" placeholder="客户名称"/>
                        </Col>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.Abbreviation)}:</span>
                        </Col>
                        <Col span={6}>
                            <Input ref={(abbreviation) => { this.abbreviation = abbreviation }} key="abbreviation" placeholder="简称"/>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={4} >
                            <span>{I18NUtils.getClientMessage(i18NCode.remarks)}:</span>
                        </Col>
                        <Col span={8}>
                            <Input ref={(remarks) => { this.remarks = remarks }} key="remarks" placeholder="备注"/>
                        </Col>
                    </Row>
                </FormItem>
    }

    buildOperationColumn = () => {
        
    }

}
