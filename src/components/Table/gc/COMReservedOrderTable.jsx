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
                self.props.reservedLotTable.setState({
                    docLineRrn: record.objectRrn, 
                    tableData: materialLotList,
                });
                if(materialLotList.length > 0){
                    self.getPackedRuleList(record.objectRrn);
                }
            }
        }
        ReservedManagerRequest.sendGetMaterialLot(object);
    }

    getPackedRuleList = (objectRrn) => {
        debugger;
        let self = this;
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
                self.setState({
                    packedRuleList: packedRuleList,
                    selectedValue: defaultQty
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

