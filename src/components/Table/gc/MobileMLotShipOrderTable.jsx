import { Tag, Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityListTable from '../EntityListTable';

export default class MobileMLotShipOrderTable extends EntityListTable {

    static displayName = 'MobileMLotShipOrderTable';

    getRowClassName = (record, index) => {
        const {selectedRows} = this.state;
        if (selectedRows.indexOf(record) >= 0) {
            return 'scaned-row';
        } else {
            if(index % 2 ===0) {
                return 'even-row'; 
            } else {
                return ''; 
            }
        }
    };

    buildOperationColumn() {
    }

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.erpCreatedBtn());
        return buttons;
    }

    queryData = () => {
        let self = this;
        self.props.queryFrom.handleSearch();
    }
    erpCreatedBtn = () => {
        return <Button key="queryData" type="primary" style={styles.tableButton} onClick={this.queryData}>{I18NUtils.getClientMessage(i18NCode.BtnSearch)}</Button>
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{I18NUtils.getClientMessage(i18NCode.TotalNumber)}：{this.state.data.length}</Tag>
    }

    
}

const styles = {
    input: {
        width: 300
    },
    tableButton: {
        marginLeft:'20px'
    }
}