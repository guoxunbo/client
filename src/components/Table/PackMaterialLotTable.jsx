
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';
import EntityListTable from './EntityListTable';
import { Notification } from '../notice/Notice';
import PackageMaterialLotRequest from '../../api/package-material-lot/PackageMaterialLotRequest';
import MessageUtils from '../../api/utils/MessageUtils';

/**
 * 所有历史表的父表。只能导出，不具备新增等其他功能
 */
export default class PackMaterialLotTable extends EntityListTable {

    static displayName = 'PackMaterialLotTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createPackageButton());
        return buttons;
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
            actionCode: "",
            actionReason: "",
            actionComment: "",
            success: function(responseBody) {
                debugger;
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        PackageMaterialLotRequest.sendPackMaterialLotsRequest(requestObject)
       
        
        // const selectedRows = this.getSelectedRows();
        // if (selectedRows && selectedRows.length > 0) {
        //     let self = this;
        //     const {rowKey} = self.state;

            
        // }
    }

    createPackageButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} icon="inbox" onClick={this.package}>
                        {I18NUtils.getClientMessage(i18NCode.BtnPackage)}
                    </Button>
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
