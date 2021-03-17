import VcFinishGoodRequest from "@api/vc/finishGood-manager/VcFinishGoodRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

/**
 * vc成品接收
 */
export default class VcFinishGoodTable extends EntityListTable {

    static displayName = 'VcFinishGoodTable';

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
    }

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
                        if(mLots[i].status != 'Create'){
                            mLots[i].rowClass = true;
                            showData.push(mLots[i]);
                        }else{
                            showData.unshift(mLots[i]);
                        }
                    }
                }
                self.props.materialLotScanTable.setState({tableData: showData})
            }
        }
        
        VcFinishGoodRequest.sendGetMaterialLot(object);
    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}