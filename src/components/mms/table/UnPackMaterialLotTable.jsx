
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import UnPackageMaterialLotRequest from '@api/unpackage-material-lot/UnPackageMaterialLotRequest';

/**
 * 拆包
 */
export default class UnPackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'UnPackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUnPackageButton());
        buttons.push(this.createUnPackageAllButton());
        return buttons;
    }

    buildOperationColumn = () => {
        
    }

    /**
     * 全部拆包 以表格数据全部传递
     */
    unPackageAll = () => {
        const {data} = this.state;
        data.forEach(d => {
            d.scaned = true;
        });
        let scanedRows = this.getScanedRows();
        this.unPackage(scanedRows);

        
    }

    /**
     * 部分拆包 以选择的数据为准进行处理
     *  
     */
    unPackagePartial = () => {
        let scanedRows = this.getScanedRows();
        this.unPackage(scanedRows);
    }

    unPackage = (waitToUnpackDetails) => {
        let self = this;
        if (!waitToUnpackDetails || waitToUnpackDetails.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            packedLotDetails: waitToUnpackDetails,
            actionCode: "",
            actionReason: "",
            actionComment: "",
            success: function(responseBody) {
                let unpackedMainMaterialLot = responseBody.materialLots[0];
                if (self.props.resetData) {
                    self.props.resetData();
                }
                let materialLotId = unpackedMainMaterialLot.materialLotId;
                let message = I18NUtils.getClientMessage(i18NCode.OperationSucceed) + `:${materialLotId}`;
                NoticeUtils.showSuccess(message);
            }
        }
        UnPackageMaterialLotRequest.sendUnPackMaterialLotsRequest(requestObject)
    }


    createUnPackageAllButton = () => {
        return <Button key="unpackageAll" type="primary" className="table-button" icon="dropbox" onClick={this.unPackageAll}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnPackageAll)}
                    </Button>
    }

    createUnPackageButton = () => {
        return <Button key="unpackage" type="primary" className="table-button" icon="dropbox" onClick={this.unPackagePartial}>
                        {I18NUtils.getClientMessage(i18NCode.BtnUnPackage)}
                    </Button>
    }

}


