
import { Button } from 'antd';
import I18NUtils from '@api/utils/I18NUtils';
import { i18NCode } from '@api/const/i18n';
import EntityScanViewTable from '@components/framework/table/EntityScanViewTable';
import NoticeUtils from '@utils/NoticeUtils';
import MessageUtils from '@api/utils/MessageUtils';
import AppendPackageMaterialLotRequest from '@api/append-package-material-lot/AppendPackageMaterialLotRequest';
import GetPrintBboxParameterRequest from '@api/gc/get-print-bbox-parameter/GetPrintBboxParameterRequest';
import PrintUtils from '@api/utils/PrintUtils';
import { PrintServiceUrl, PrintBboxCount } from '@api/gc/GcConstDefine';

/**
 * 追加包装
 */
export default class AddPackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'AddPackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createUnPackageButton());
        return buttons;
    }
    buildOperation = (record) => {
        let operations = [];
        if (record.newFlag) {
            operations.push(this.buildDeletePopConfirm(record));
        }
        return operations;
    }

    getRowClassName = (record, index) => {
        if (record.newFlag) {
            return 'new-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    handlePrint = (materialLot) => {
        let requestObject = {
            materialLotRrn : materialLot.objectRrn,    
            success: function(responseBody) {
                let url = PrintServiceUrl.Bbox;
                PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, PrintBboxCount);
            }
        }
        GetPrintBboxParameterRequest.sendQueryRequest(requestObject);
    }

    appendPackage = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        // 检验数据
        let waitToPackageLots= [];
        let packedMaterialLotId;
        data.forEach((d) => {
            if (d.newFlag) {
                waitToPackageLots.push(d);
            } else {
                packedMaterialLotId = d.parentMaterialLotId;
            }
        });
        if (waitToPackageLots.length === 0) {
            NoticeUtils.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            packedMaterialLotId: packedMaterialLotId,
            waitToPackMaterialLots: waitToPackageLots,
            actionCode: "",
            actionReason: "",
            actionComment: "",
            success: function(responseBody) {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                let materialLotId = responseBody.materialLot.materialLotId;
                let message = I18NUtils.getClientMessage(i18NCode.OperationSucceed) + `:${materialLotId}`;
                MessageUtils.showOperationSuccess(message);
                self.handlePrint(responseBody.materialLot);
            }
        }
        AppendPackageMaterialLotRequest.sendAppendPackMaterialLotsRequest(requestObject)
    }

    createUnPackageButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} icon="dropbox" onClick={this.appendPackage}>
                        {I18NUtils.getClientMessage(i18NCode.BtnAppendPackage)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
