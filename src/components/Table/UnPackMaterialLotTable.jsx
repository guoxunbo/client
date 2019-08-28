
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityScanViewTable from './EntityScanViewTable';
import { Notification } from '../notice/Notice';
import PackageMaterialLotRequest from '../../api/package-material-lot/PackageMaterialLotRequest';
import MessageUtils from '../../api/utils/MessageUtils';
import UnPackageMaterialLotRequest from '../../api/unpackage-material-lot/UnPackageMaterialLotRequest';

/**
 * 拆包
 */
export default class UnPackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'UnPackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUnPackageButton());
        return buttons;
    }

    unPackage = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            packedLotDetails: data,
            actionCode: "",
            actionReason: "",
            actionComment: "",
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        UnPackageMaterialLotRequest.sendUnPackMaterialLotsRequest(requestObject)
    }

    createUnPackageButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} icon="dropbox" onClick={this.unPackage}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnPackage)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
