
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityScanViewTable from './EntityScanViewTable';
import { Notification } from '../notice/Notice';
import MessageUtils from '../../api/utils/MessageUtils';
import UnPackageMaterialLotRequest from '../../api/unpackage-material-lot/UnPackageMaterialLotRequest';

/**
 * 拆包
 */
export default class UnPackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'UnPackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUnPackageAllButton());
        buttons.push(this.createUnPackageButton());
        return buttons;
    }

    getRowClassName = (record, index) => {
        if (record.scaned) {
            return 'selected-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
        
    };

    buildOperationColumn = () => {
        
    }

    /**
     * 全部拆包 以表格数据全部传递
     */
    unPackageAll = () => {
        const {data} = this.state;
        this.unPackage(data);
    }

    /**
     * 部分拆包 以选择的数据为准进行处理
     *  
     */
    unPackagePartial = () => {
        const {selectedRows} = this.state;
        this.unPackage(selectedRows);
    }

    unPackage = (waitToUnpackDetails) => {
        let self = this;
        if (!waitToUnpackDetails || waitToUnpackDetails.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            packedLotDetails: waitToUnpackDetails,
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


    createUnPackageAllButton = () => {
        return <Button key="unpackageAll" type="primary" style={styles.tableButton} icon="dropbox" onClick={this.unPackageAll}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnPackageAll)}
                    </Button>
    }

    createUnPackageButton = () => {
        return <Button key="unpackage" type="primary" style={styles.tableButton} icon="dropbox" onClick={this.unPackagePartial}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnPackage)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
