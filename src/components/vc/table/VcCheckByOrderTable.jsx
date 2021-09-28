import CheckMLotRequest from "@api/vc/check-mlot-manager/CheckMLotRequest";
import EntityListTable from "@components/framework/table/EntityListTable";

/**
 * by单据盘点
 */
export default class VcCheckByOrderTable extends EntityListTable {

    static displayName = 'VcCheckByOrderTable';

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
        self.setState({
            selectedRows: selectedRows,
            loading: true,
        })
        self.props.scanProperties.setState({loading: true})
        let object = {
            documentLine: record,
            success: function(responseBody) {
                self.setState({
                    loading: false
                })
                let materialLots = responseBody.materialLotList;
                if(materialLots){
                    showData = materialLots;
                }
                self.props.scanProperties.setState({
                    tableData: showData,
                    loading: false
                })
            },
            fail: function () {
                self.setState({loading:false})
                self.props.scanProperties.setState({loading: false})
            }
        }
        if("WaitRecheck" == record.status){
            CheckMLotRequest.sendGetWaitRecheckMLotRequest(object);
        }else{
            CheckMLotRequest.sendGetReservedRequest(object);
        }

    }

    /**
     * 接收数据不具备可删除等操作
     */
    buildOperationColumn = () => {
        
    }

}