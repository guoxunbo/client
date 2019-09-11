import EntityScanViewTable from '../EntityScanViewTable';
import { Button } from 'antd';
import IconUtils from '../../../api/utils/IconUtils';
import CheckInventoryManagerRequest from '../../../api/gc/check-inventory-manager/CheckInventoryManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

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
        let self = this;
        let existMaterialLots = this.state.data.filter((d) => d.errorFlag === undefined || d.errorFlag === false);
        let errorMaterialLots = this.state.data.filter((d) => d.errorFlag && d.errorFlag === true);
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
        buttons.push(this.createCheckButton());
        return buttons;
    }

    createCheckButton = () => {
        return <Button key="check" type="primary" style={styles.tableButton} onClick={() => this.handleCheck()}>
                 {IconUtils.buildIcon("icon-pandian")} {"盘点"}
                </Button>;
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
