import VcStockOutRequest from "@api/vc/stock-out-manager/VcStockOutRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

/**
 * vc出货
 */
export default class VcStockOutTable extends EntityListTable {

    static displayName = 'VcStockOutTable';

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
            docLineId: record.lineId,
            success: function(responseBody) {
                self.handledSuccess(responseBody);  
            }
        }
       VcStockOutRequest.sendGetMaterialLot(object);
    }

    handledSuccess =(responseBody) =>{
        let self = this;
        let showData = [];
        let mLots = responseBody.materialLots;
        if(mLots){
            for(let i=0; i< mLots.length; i++){
                if(mLots[i].status == 'Ship'){
                    mLots[i].rowClass = true;
                    showData.push(mLots[i]);
                }else{
                    showData.unshift(mLots[i]);
                }
            }
        }
        self.props.materialLotScanTable.setState({tableData: showData})

    }
    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}