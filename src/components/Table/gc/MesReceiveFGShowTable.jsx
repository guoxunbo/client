import EntityListTable from '../EntityListTable';
import { Tag } from 'antd';

/**
 * 成品显示
 */
export default class MesReceiveFGShowTable extends EntityListTable {

    static displayName = 'MesReceiveFGShowTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{this.state.data.length}</Tag>
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
