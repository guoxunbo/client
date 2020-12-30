import EntityListTable from '@components/framework/table/EntityListTable';
import IncomingMaterialReceiveRequest from '@api/Incoming-Material-Manager/Incoming-Material-Receive-Manager/IncomingMaterialReceiveRequest';

/**
 * 来料单显示
 */
export default class IncomingMaterialOrderTable extends EntityListTable {

    static displayName = 'IncomingMaterialOrderTable';

    createButtonGroup = () => {
      
    }

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

     /**
     * 行点击事件
     */
    selectRow = (record) => {
        let self = this;
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        if(record.unHandledQty == 0){
            self.props.materialOrderScanProperties.setState({tableData : ''});
            return ;
        }
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                 self.props.materialOrderScanProperties.setState({tableData: responseBody.materialLotList})
            }
        }
        IncomingMaterialReceiveRequest.sendGetMaterialLot(object);
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}
