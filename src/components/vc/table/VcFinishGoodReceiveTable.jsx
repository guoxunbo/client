import VcFinishGoodReceiveRequest from "@api/vc/finishGood-manager/receive/VcFinishGoodReceiveRequest";
import IncomingMaterialReceiveTable from "@components/mms/table/IncomingMaterialReceiveTable";


/**
 * 接收
 */
export default class VcFinishGoodReceiveTable extends IncomingMaterialReceiveTable {

    static displayName = 'VcFinishGoodReceiveTable';

    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        let showData = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        if(record.unHandledQty == 0){
            self.props.materialOrderScanProperties.setState({tableData : []});
            return ;
        }
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                showData = responseBody.materialLotList;

                self.props.materialOrderScanProperties.setState({tableData: showData})
            }
        }
        VcFinishGoodReceiveRequest.sendGetMaterialLotRequest(object);
    }

}