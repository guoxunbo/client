import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import { Button } from 'antd';
import IconUtils from '@utils/IconUtils';
import VcMaterialLotInventoryRequest from '@api/vc/material-lot-inventory-manager/VcMaterialLotInventoryRequest';

export default class VcCheckTable extends EntityScanViewTable {

    static displayName = 'VcCheckTable';

    getRowClassName = (record, index) => {
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    handleCheck = () => {
        let self = this;
        let scanedMaterialLots = this.state.data.filter((d) => d.scanedFlag && d.scanedFlag === true);
        let requestObject = {
            materialLots: scanedMaterialLots,
            success: function() {
                self.refreshDelete(scanedMaterialLots);
            },
            fail: function(){
                self.refreshDelete(scanedMaterialLots);
            }
        }
        VcMaterialLotInventoryRequest.sendCheckInventoryRequest(requestObject);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createCheckButton());
        return buttons;
    }

    createCheckButton = () => {
        return <Button key="check" type="primary" className="table-button" onClick={() => this.handleCheck()}>
                 {IconUtils.buildIcon("icon-pandian")} {"盘点"}
                </Button>;
    }

}

