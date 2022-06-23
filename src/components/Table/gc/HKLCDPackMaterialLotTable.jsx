import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Notification } from '../../notice/Notice';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Tag } from 'antd';
import PackageMaterialLotRequest from '../../../api/package-material-lot/PackageMaterialLotRequest';
import EntityScanViewTable from '../EntityScanViewTable';
import GetPrintBboxParameterRequest from '../../../api/gc/get-print-bbox-parameter/GetPrintBboxParameterRequest';

export default class HKLCDPackMaterialLotTable extends EntityScanViewTable {

    static displayName = 'HKLCDPackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPackageButton());
        return buttons;
    }

    createTagGroup = () => {
        let tags = [];
        tags.push(this.createStatistic());
        tags.push(this.createTotalNumber());
        return tags;
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                count = count + data.currentQty;
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }

    handlePrint = (materialLot) => {
        let requestObject = {
            materialLotRrn : materialLot.objectRrn,    
            success: function(responseBody) {
            }
        }
        GetPrintBboxParameterRequest.sendQueryRequest(requestObject);
    }

    package = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }
        let requestObject = {
            materialLots: data,
            packageType: "HKLCDPackCase",
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
