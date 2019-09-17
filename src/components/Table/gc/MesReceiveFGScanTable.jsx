
import EntityListCheckTable from '../EntityListCheckTable';

import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';
import EntityScanViewTable from '../EntityScanViewTable';

export default class MesReceiveFGScanTable extends EntityScanViewTable {

    static displayName = 'MesReceiveFGScanTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReceiveButton());
        return buttons;
    }

    receive = () => {
        const {data} = this.state;
        if (data && data.length > 0) {
            let self = this;
            const {rowKey} = self.state;

            let requestObject = {
                mesPackedLots: data,
                success: function(responseBody) {
                    // let datas = self.state.data;   
                    // selectedRows.forEach((selectedRow) => {
                    //     const existData = datas.find(data => data[rowKey] === selectedRow[rowKey]);
                    //     if (existData) {
                    //         datas.splice(datas.indexOf(existData), 1);
                    //     }
                    // });
                    // self.setState({
                    //     data: datas,
                    //     selectedRows: [],
                    //     selectedRowKeys: []
                    // })
                    if (self.props.resetData) {
                        self.props.resetData();
                    }
                    MessageUtils.showOperationSuccess();
                }
            }
            FinishGoodInvManagerRequest.sendReceiveRequest(requestObject);
        }
    }


    createReceiveButton = () => {
        return <Button key="receive" type="primary" style={styles.tableButton} icon="import" onClick={this.receive}>
                        {I18NUtils.getClientMessage(i18NCode.BtnReceive)}
                    </Button>
    }

}

const styles = {
    tableButton: {
        marginLeft:'20px'
    }
};
