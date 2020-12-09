import EntityListTable from '../EntityListTable';
import { Tag } from 'antd';

/**
 * COB成品显示
 */
export default class MesCOBReceiveFGShowTable extends EntityListTable {

    static displayName = 'MesCOBReceiveFGShowTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{this.state.data.length}</Tag>
    }

    buildOperationColumn = () => {
        
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
