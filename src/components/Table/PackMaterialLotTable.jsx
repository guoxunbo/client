
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityScanViewTable from './EntityScanViewTable';
import { Notification } from '../notice/Notice';
import PackageMaterialLotRequest from '../../api/package-material-lot/PackageMaterialLotRequest';
import MessageUtils from '../../api/utils/MessageUtils';
import { PrintServiceUrl, PrintBboxCount } from '../../api/gc/GcConstDefine';
import GetPrintBboxParameterRequest from '../../api/gc/get-print-bbox-parameter/GetPrintBboxParameterRequest';
import PrintUtils from '../../api/utils/PrintUtils';
import { Tag } from 'antd';

/**
 * 包装物料批次
 */
export default class PackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'PackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createTotalNumber());
        buttons.push(this.createPackageButton());
        return buttons;
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">颗数：{count}</Tag>
    }
    createStatistic = () => {
        return <Tag color="#2db7f5">包数：{this.state.data.length}</Tag>
    }

    handlePrint = (materialLot) => {
        let requestObject = {
            materialLotRrn : materialLot.objectRrn,    
            success: function(responseBody) {
                if(responseBody.parameters){
                    let url = PrintServiceUrl.Bbox;
                    PrintUtils.printWithBtIbForWeb(url, responseBody.parameters, PrintBboxCount);
                }
                if(responseBody.customerParameter){
                    let url = PrintServiceUrl.CusNameLabel;
                    PrintUtils.printWithBtIbForWeb(url, responseBody.customerParameter, 1);
                }
            }
        }
        GetPrintBboxParameterRequest.sendQueryRequest(requestObject);
    }

    package = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: data,
            packageType: "PackCase",
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
        PackageMaterialLotRequest.sendPackMaterialLotsRequest(requestObject)
    }

    createPackageButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} icon="inbox" onClick={this.package}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPackage)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
