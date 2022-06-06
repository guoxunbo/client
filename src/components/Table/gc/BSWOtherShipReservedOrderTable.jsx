import EntityListTable from '../EntityListTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';
import { i18NCode } from '../../../api/const/i18n';
import { SystemRefListName } from '../../../api/const/ConstDefine';
import RefListField from '../../Field/RefListField';
import { Col, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import I18NUtils from '../../../api/utils/I18NUtils';

export default class BSWOtherShipReservedOrderTable extends EntityListTable {

    static displayName = 'BSWOtherShipReservedOrderTable';

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStockLocationInput());
        return tags;
    }

    createStockLocationInput = () => {
        return  <FormItem>
                    <Row gutter={10}>
                        <Col span={2} >
                            <span>{I18NUtils.getClientMessage(i18NCode.StockLocation)}:</span>
                        </Col>
                        <Col span={4}>
                            <RefListField ref={(stockLocation) => { this.stockLocation = stockLocation }} referenceName={SystemRefListName.StockLocation} />
                        </Col>
                    </Row>
                </FormItem>
    }

    /**
     * 行点击事件
     */
    selectRow = (record) => {
        let self = this;
        let stockLocation = self.stockLocation.state.value;
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            docLineRrn: record.objectRrn,
            tableRrn: this.props.reservedLotTable.state.table.objectRrn,
            stockLocation: stockLocation,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                self.getPackedRuleList(record, materialLotList);
            }
        }
        ReservedManagerRequest.sendBSWGetOtherShipReservedMLot(object);
    }

    getPackedRuleList = (order, materialLotList) => {
        let self = this;
        let objectRrn = order.objectRrn;
        let unReservedQty = order.unReservedQty;
        let obj = {
            docLineRrn: objectRrn,
            success: function(responseBody) {
                let packedRuleList = [];
                let defaultQty = "";
                let dataList = responseBody.boxPackedQtyList;
                let defaultPackedRule = responseBody.defaultPackedRule;
                if(defaultPackedRule){
                    defaultQty = defaultPackedRule.boxPackedQty
                }
                dataList.map(d => {
                    let refData = {
                        key: d.boxPackedQty,
                        value: d.boxPackedQty
                    };
                    packedRuleList.push(refData);
                }); 
                self.props.reservedLotTable.setState({
                    docLineRrn: objectRrn, 
                    tableData: materialLotList,
                    resetFlag: true,
                    packedRuleList: packedRuleList,
                    defaultQty: defaultQty,
                    unReservedQty: unReservedQty
                });
            }
        }
        ReservedManagerRequest.sendPackedRuleListByDocRrn(obj);
    }

    createButtonGroup = () => {}
    buildOperationColumn = () => {}
}

