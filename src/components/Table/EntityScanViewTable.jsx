
import EntityListTable from './EntityListTable';
import { Tag } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';
import { i18NCode } from '../../api/const/i18n';

/**
 * 所有扫描条件添加数据的父类
 *  不具备操作按钮，具备删除按钮。删除按钮只是删除表格数据，而非删除数据库数据
 */
export default class EntityScanViewTable extends EntityListTable {

    static displayName = 'EntityScanViewTable';

    getRowClassName = (record, index) => {
        if (record.scaned) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    selectRow = () => {

    }
    
    createButtonGroup = () => {
        
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{this.state.data.length}</Tag>
    }

    createBoxNumber = () => {
        let materialLotList = this.state.data;
        let boxIdList = [];
        if(materialLotList && materialLotList.length > 0){
            materialLotList.forEach(data => {
                if (data.parentMaterialLotId && boxIdList.indexOf(data.parentMaterialLotId) == -1) {
                    boxIdList.push(data.parentMaterialLotId);
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.BoxQty)}：{boxIdList.length}</Tag>
    }

    createPackageQty = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.PackageQty)}：{this.state.data.length}</Tag>
    }

    createTotalNumber = () => {
        let materialLots = this.state.data;
        let count = 0;
        if(materialLots && materialLots.length > 0){
            materialLots.forEach(data => {
                if (data.currentQty != undefined) {
                    count = count + data.currentQty;
                }
            });
        }
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalQty)}：{count}</Tag>
    }
    
    handleDelete = (record) => {
        this.refreshDelete(record);
    } 

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

}
