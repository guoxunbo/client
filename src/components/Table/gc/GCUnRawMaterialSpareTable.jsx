import EntityListCheckTable from '../EntityListCheckTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Button } from 'antd';
import GCRawMaterialImportRequest from '../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest';
import EventUtils from '../../../api/utils/EventUtils';

export default class GCUnRawMaterialSpareTable extends EntityListCheckTable {

    static displayName = 'GCUnRawMaterialSpareTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createGCUnRawMaterialSpare());
        return buttons;
    }

    GCUnRawMaterialSpare = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        self.setState({
            loading: true
        });
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => self.setState({loading: false}));

        let requestObj = {
            materialLots : materialLots,
            success: function(responseBody) {
                self.refreshDelete(materialLots);
            }
        }

        GCRawMaterialImportRequest.sendGCUnRawMaterialSpare(requestObj);
    }

    buildOperationColumn = () => {
        
    }

    createGCUnRawMaterialSpare = () => {
        return <Button key="createGCUnRawMaterialSpare" type="primary" style={styles.tableButton} icon="delete" loading={this.state.loading} onClick={this.GCUnRawMaterialSpare}>
                        {I18NUtils.getClientMessage(i18NCode.CancelSpare)}
                    </Button>
    }

   
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    },
};