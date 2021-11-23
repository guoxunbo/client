import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import IconUtils from '../../../api/utils/IconUtils';
import CheckInventoryManagerRequest from '../../../api/gc/check-inventory-manager/CheckInventoryManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import { Notification } from '../../notice/Notice';
import { Tag } from 'antd';

/**
 * 格科盘点表
 */
export default class CheckTable extends EntityScanViewTable {

    static displayName = 'CheckTable';

    getRowClassName = (record, index) => {
        // 如果是扫描到不存在的批次，则进行高亮显示
        if (record.errorFlag) {
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
        
    };

    constructor(props) {
        super(props);
        this.state = {...this.state, ...{formTable: {fields: []}}};
    }

    handleCheck = () => {
        const {data} = this.state;
        let self = this;
        if (!data || data.length == 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.SelectAtLeastOneRow));
            return;
        }
        let existMaterialLots = this.state.data.filter((d) => d.errorFlag === undefined || d.errorFlag === false);
        let errorMaterialLots = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
        if (this.getErrorCount() > 0){
            Notification.showError(I18NUtils.getClientMessage(i18NCode.ErrorNumberMoreThanZero));
            return;
        }
        let requestObject = {
            existMaterialLots: existMaterialLots,
            errorMaterialLots: errorMaterialLots,
            success: function() {
                if (self.props.resetData) {
                    self.props.resetData();
                }
                MessageUtils.showOperationSuccess();
            }
        }
        CheckInventoryManagerRequest.sendCheckInventory(requestObject);
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createNumberStatistic());
        buttons.push(this.createTotalNumberStatistic());
        buttons.push(this.createErrorNumberStatistic());
        buttons.push(this.createCheckButton());
        return buttons;
    }

    createTotalNumberStatistic = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(!data.errorFlag){
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{count}</Tag>
    }

    createNumberStatistic = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(!data.errorFlag){
                    count = count +1;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalStrokeCount)}：{count}</Tag>
    }

    getErrorCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.errorFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createCheckButton = () => {
        return <Button key="check" type="primary" style={styles.tableButton} onClick={() => this.handleCheck()}>
                 {IconUtils.buildIcon("icon-pandian")} {"盘点"}
                </Button>;
    }

    buildOperationColumn = () => {
        
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
