import CheckMLotRequest from '@api/vc/check-mlot-manager/CheckMLotRequest';
import MobileTable from '@components/framework/table/MobileTable';

export default class CheckOrderTable extends MobileTable {

    static displayName = 'CheckOrderTable';

    selectRow = (record) => {
        let selectedRows = [];
        selectedRows.push(record);
        this.setState({
            selectedRows: selectedRows
        });
        let self = this ;
        let object = {
            documentLine: record,
            success: function(responseBody) {
                let showData = []
                if(responseBody.materialLotList){
                    showData = responseBody.materialLotList;
                }
                self.props.scanProperties.setState({
                    tableData: showData,
                })
            }
        }
        if("WaitRecheck" == record.status){
            CheckMLotRequest.sendGetWaitRecheckMLotRequest(object);
        }else{
            CheckMLotRequest.sendGetReservedRequest(object);
        }
    }
    
}

