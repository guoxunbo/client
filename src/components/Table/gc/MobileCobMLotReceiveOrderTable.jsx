import { Tag, Button} from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import EntityListTable from '../EntityListTable';

export default class MobileCobMLotReceiveOrderTable extends EntityListTable {

    static displayName = 'MobileMLotReceiveTable';

    getRowClassName = (record, index) => {
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
    
    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createStatistic());
        buttons.push(this.createSearchButton());
        return buttons;
    }

    createStatistic = () => {
        return <Tag color="#2db7f5">{this.state.data.length}</Tag>
    }

    queryData = () => {
        let self = this;
        self.props.queryFrom.handleSearch();
    }

    createSearchButton = () => {
        return <Button key="search" type="primary" style={styles.tableButton} icon="inbox" onClick={this.queryData}>
                        {I18NUtils.getClientMessage(i18NCode.BtnSearch)}
                    </Button>
    }

    buildOperationColumn = () => {

    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
