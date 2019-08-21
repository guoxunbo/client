
import EntityListCheckTable from '../EntityListCheckTable';

import { Button } from 'antd';
import I18NUtils from '../../../api/utils/I18NUtils';
import { i18NCode } from '../../../api/const/i18n';
import FinishGoodInvManagerRequest from '../../../api/gc/finish-good-manager/FinishGoodInvManagerRequest';
import MessageUtils from '../../../api/utils/MessageUtils';

/**
 * 所有历史表的父表。只能导出，不具备新增等其他功能
 */
export default class MesReceiveFGTable extends EntityListCheckTable {

    static displayName = 'MesReceiveFGTable';

    createButtonGroup = () => {
        let buttons = [];
        buttons.push(this.createReceiveButton());
        buttons.push(this.createExportDataButton());
        return buttons;
    }

    receive = () => {
        const selectedRows = this.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
            let self = this;
            let requestObject = {
                mesPackedLots: selectedRows,
                success: function(responseBody) {
                    let datas = self.state.data;    
                    selectedRows.forEach((selectedRow) => {
                        let dataIndex = datas.indexOf(selectedRow);
                        if (dataIndex > -1) {
                            datas.splice(dataIndex, 1);
                        }
                    });
                    self.setState({
                        data: datas,
                        selectedRows: [],
                        selectedRowKeys: []
                    })
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
