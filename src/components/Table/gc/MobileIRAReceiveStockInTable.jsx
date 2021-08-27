import EntityScanViewTable from '../EntityScanViewTable';
import { Tag } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import MessageUtils from '../../../api/utils/MessageUtils';

/**
 * IRA接收入库Table
 */
export default class MobileIRAReceiveStockInTable extends EntityScanViewTable {

    static displayName = 'MobileIRAReceiveStockInTable';

    getRowClassName = (record, index) => {
        if (record.scanSecondFlag) {
            return 'repeat-row'
        } else if (record.scanFlag) {
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
        tags.push(this.createMaterialLotsNumber());
        tags.push(this.createTotalNumber());
        tags.push(this.line());
        tags.push(this.line());
        tags.push(this.createErrorNumberStatistic());
        tags.push(this.createRepeatScanNumberStatistic());
        return tags;
    }

    line = () =>{
        return <br/>
    }

    createErrorNumberStatistic = () => {
        return <Tag color="#D2480A">{I18NUtils.getClientMessage(i18NCode.ErrorNumber)}：{this.getErrorCount()}</Tag>
    }

    createRepeatScanNumberStatistic = () => {
        return <Tag color="#aa23df">{I18NUtils.getClientMessage(i18NCode.RepeatScanNumber)}：{this.getRepeatScanCount()}</Tag>
    }

    createMaterialLotsNumber = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLotUnits = this.state.data;
        let count = 0;
        if(materialLotUnits && materialLotUnits.length > 0){
            materialLotUnits.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty*10000;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count/10000}</Tag>
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

    getRepeatScanCount = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if(data.scanSecondFlag){
                    count = count +1;
                }
            });
        }
        return count;
    }

    refreshDelete = (records) => {
        let datas = this.state.data;
        let recordList = [];
        if (!(records instanceof Array)) {
            let lotId = records.lotId;
            datas.forEach((item) => {
                if(item.lotId == lotId){
                    recordList.push(item);
                }
            });
        } else {
            recordList = records;
        }
        recordList.forEach((record) => {
            let dataIndex = datas.indexOf(record);
            if (dataIndex > -1 ) {
                datas.splice(dataIndex, 1);
            }
        });
        this.setState({
            data: datas,
            selectedRows: [],
            selectedRowKeys: []
        })
        MessageUtils.showOperationSuccess();
    }
}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
