import IncomingMaterialReceiveRequest from '@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest';
import MobileTable from '@components/framework/table/MobileTable';
import { i18NCode } from '@const/i18n';
import I18NUtils from '@utils/I18NUtils';
import { Tag } from 'antd';

export default class ReceiveMaterialLotOrderTable extends MobileTable {

    static displayName = 'ReceiveMaterialLotOrderTable';

    selectRow = (record) => {
        let self = this ;
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                self.props.orderProperties.setState({
                    tableData:responseBody.materialLotList
                })
            }
        }
        IncomingMaterialReceiveRequest.sendGetMaterialLot(object);
    }
    
}

