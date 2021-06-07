import VcFinishGoodReservedRequest from "@api/vc/finishGood-manager/reserved/VcFinishGoodReservedRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

export default class VcReservedMLotTable extends EntityListTable {

    static displayName = 'VcReservedMLotTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

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
    }

    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        let showData = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        self.props.materialLotScanProperties.resetData();
        let object = {
            documentLine: record,
            success: function(responseBody) {
                showData = responseBody.materialLotList;
                
                self.props.materialLotScanProperties.setState({
                    tableData: showData, 
                })
            }
        }
        VcFinishGoodReservedRequest.sendGetMaterialLot(object);
    }
}