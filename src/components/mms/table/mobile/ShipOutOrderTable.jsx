import VcStockOutRequest from '@api/vc/stock-out-manager/VcStockOutRequest';
import MobileTable from '@components/framework/table/MobileTable';


export default class ShipOutOrderTable extends MobileTable {

    static displayName = 'ShipOutOrderTable';

    selectRow = (record) => {
        
    }

    getMaterialLot = (record) => {
        let self = this;
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            docLineId: record.lineId,
            success: function(responseBody) {
                record.scaned = true;
                self.props.orderProperties.setState({
                    tableData:responseBody.materialLots
                })
            }
        }
        VcStockOutRequest.sendGetMaterialLot(object);
    }
    
}

