import EntityListCheckTable from '../EntityListCheckTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Button } from 'antd';
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

export default class UnReserverdMaterialLotTable extends EntityListCheckTable {

    static displayName = 'UnReserverdMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createCancelReserved());
        return buttons;
    }

    unReservedMaterialLot = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        let requestObj = {
            materialLots : materialLots,
            success: function(responseBody) {
                self.refreshDelete(materialLots);
            }
        }

        ReservedManagerRequest.sendUnReserved(requestObj);
    }

    buildOperationColumn = () => {
        
    }

    createCancelReserved = () => {
        return <Button key="cancelReserved" type="primary" style={styles.tableButton} icon="delete" onClick={this.unReservedMaterialLot}>
                        {I18NUtils.getClientMessage(i18NCode.Cancel)}
                    </Button>
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    },
};