import EntityListTable from '../EntityListTable';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';

export default class COMReservedOrderTable extends EntityListTable {

    static displayName = 'COMReservedOrderTable';

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

    /**
     * 行点击事件
     */
    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            docLineRrn: record.objectRrn,
            tableRrn: this.props.reservedLotTable.state.table.objectRrn,
            success: function(responseBody) {
                let materialLotList = responseBody.materialLotList;
                self.getPackedRuleList(record, materialLotList);
            }
        }
        ReservedManagerRequest.sendGetMaterialLot(object);
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

    createButtonGroup = () => {
       
    }

    buildOperationColumn = () => {
        
    }

}

