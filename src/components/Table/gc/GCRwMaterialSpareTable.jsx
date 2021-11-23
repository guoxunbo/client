import { Button, Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityListCheckTable from '../EntityListCheckTable';
import RwMaterialManagerRequest from '../../../api/gc/rw-material-manager/RwMaterialManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

/**
 * RW材料备料
 */
export default class GCRwMaterialSpareTable extends EntityListCheckTable {

    static displayName = 'GCRwMaterialSpareTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createSpareMaterial());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStatistic());
        return tags;
    }

    spaerMaterial = () => {
        let self = this;
        let materialLots = this.getSelectedRows();
        if (materialLots.length === 0 ) {
            return;
        }

        let requestObject = {
            materialLotList : materialLots,
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                self.setState({
                    data: [],
                    selectedRows: [],
                    selectedRowKeys: []
                }) 
                MessageUtils.showOperationSuccess();
            }
        }
        RwMaterialManagerRequest.sendSpareMaterialRequest(requestObject);
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PieceQty)}：{this.state.data.length}</Tag>
    }

    createSpareMaterial = () => {
        return <Button key="spareMaterial" type="primary" style={styles.tableButton} icon="inbox" loading={this.state.loading} onClick={this.spaerMaterial}>
                        {I18NUtils.getClientMessage(i18NCode.BtnSpareMaterial)}
                    </Button>
    }

    buildOperationColumn = () => {
        
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
