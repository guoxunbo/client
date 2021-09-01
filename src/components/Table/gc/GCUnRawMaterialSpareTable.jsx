import I18NUtils from "../../../api/utils/I18NUtils";
import { i18NCode } from "../../../api/const/i18n";
import { Button , Tag} from 'antd';
import GCRawMaterialImportRequest from '../../../api/gc/GCRawMaterialImport-manager/GCRawMaterialImportRequest';
import EventUtils from '../../../api/utils/EventUtils';
import EntityListTable from "../EntityListTable";
import MessageUtils from "../../../api/utils/MessageUtils";

export default class GCUnRawMaterialSpareTable extends EntityListTable {

    static displayName = 'GCUnRawMaterialSpareTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createGCUnRawMaterialSpare());
        return buttons;
    }

    createTagGroup = () => {
        let tagList = [];
        tagList.push(this.createStatistic());
        tagList.push(this.createTotalNumber());
        return tagList;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}:{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty*10000;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count/10000}</Tag>
    }

    GCUnRawMaterialSpare = () => {
        let self = this;
        let materialLots = self.state.data;
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
                if (self.props.resetData) {
                    self.props.resetData();
                }    
                MessageUtils.showOperationSuccess();
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