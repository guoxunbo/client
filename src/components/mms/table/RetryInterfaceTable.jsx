import RetryInterfaceRequest from '@api/interface-manager/RetryInterfaceRequest';
import EntityListTable from '@components/framework/table/EntityListTable';
import I18NUtils from '@utils/I18NUtils';
import NoticeUtils from '@utils/NoticeUtils';
import { Button } from 'antd';

/**
 * 接口的重发
 */
export default class RetryInterfaceTable extends EntityListTable {

    static displayName = 'RetryInterfaceTable';

    createButtonGroup = () => {
        return(<Button key = "Retry" type="primary" className="table-button" icon="inbox" onClick={this.handleRetry} loading={this.state.loading}>
            {I18NUtils.getClientMessage("重发")}
        </Button>)
    }

    handleRetry = () => {
        let self = this;
        self.setState({loading: true});
        let interfaceFailList = self.getSelectedRows();
        let object = {
            interfaceFailList: interfaceFailList,
            success: function() {
                NoticeUtils.showSuccess();
                self.setState({
                    loading:false,
                })
            }
        }
        RetryInterfaceRequest.sendRetryRequest(object);
    }

    buildOperationColumn = () => {
        
    }

}
