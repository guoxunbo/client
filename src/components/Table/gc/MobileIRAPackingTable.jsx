import EntityScanViewTable from '../EntityScanViewTable';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import { Tag } from 'antd';
import GetPrintRawMlotRequest from '../../../api/gc/get-print-rawMlot-parameter/GetPrintRawMlotRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

export default class MobileIRAPackingTable extends EntityScanViewTable {

    static displayName = 'MobileIRAPackingTable';

    constructor(props) {
        super(props);
        this.state = {...this.state};
    }

    getRowClassName = (record, index) => {
        if (record.scanFlag) {
            return 'new-row';
        } else if(record.errorFlag){
            return 'error-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

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

    IRABoxLabelPrint = (materialLots) => {
        let self = this;
        if (materialLots.length === 0) {
            Notification.showNotice(I18NUtils.getClientMessage(i18NCode.AddAtLeastOneRow));
            return;
        }

        self.setState({
            loading: true
        });

        let requestObject = {
            materialLots : materialLots,
            success: function(responseBody) {
                MessageUtils.showOperationSuccess();
            }
        }
        GetPrintRawMlotRequest.sendIRABoxPrintLableRequest(requestObject);
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
