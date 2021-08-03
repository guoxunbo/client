import VcMaterialLotInventoryRequest from "@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

/**
 * vc成品出库
 */
export default class VcMaterialLotInventoryTable extends EntityListTable {

    static displayName = 'VcMaterialLotInventoryTable';

    createButtonGroup = () => {
      
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
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            document: record,
            success: function(responseBody) {
                let mLots = responseBody.materialLotInventorys;
                self.props.materialLotScanProperties.setState({tableData: mLots})
                self.props.materialLotScanProperties.form.state.queryFields[0].node.focus();
            }
        }
        
        VcMaterialLotInventoryRequest.sendGetMaterialLotByDoc(object);
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}