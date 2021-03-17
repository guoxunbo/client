import ReturnLotOrderRequest from '@api/return-material-manager/ReturnLotOrderRequest';
import EntityListTable from '@components/framework/table/EntityListTable';

export default class ReturnMLotOrderTable extends EntityListTable {

    static displayName = 'ReturnMLotOrderTable';

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
        let showData = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let object = {
            documentId: record.name,
            success: function(responseBody) {
                let mLots = responseBody.materialLotList;
                if(mLots){
                    for(let i=0; i< mLots.length; i++){
                        if(mLots[i].status != 'Return'){
                            mLots[i].rowClass = true;
                            showData.push(mLots[i]);
                        }else{
                            showData.unshift(mLots[i]);
                        }
                    }
                }
                self.props.orderScanTable.setState({tableData: showData})
            }
        }
        ReturnLotOrderRequest.sendGetReturnLotInfoRequest(object);
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}
