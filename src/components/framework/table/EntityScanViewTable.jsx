
import EntityListTable from '@components/framework/table/EntityListTable';
import { Tag } from 'antd';

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
    
    handleDelete = (record) => {
        this.refreshDelete(record);
    } 

    buildOperation = (record) => {
        let operations = [];
        operations.push(this.buildDeletePopConfirm(record));
        return operations;
    }

}
