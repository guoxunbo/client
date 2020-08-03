import GcWaitForIssueMLotUnitTable from "../../../../../components/Table/gc/GcWaitForIssueMLotUnitTable";
import EntityProperties from "../../entityProperties/EntityProperties";
import TableManagerRequest from "../../../../../api/table-manager/TableManagerRequest";
import WaferManagerRequest from "../../../../../api/gc/wafer-manager-manager/WaferManagerRequest";

export default class GcWaitForIssueMLotUnitProperties extends EntityProperties{

    static displayName = 'GcWaitForIssueMLotUnitProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }

    componentWillReceiveProps = () => {
      this.queryData();
    }

    //暂时取消卡控必须绑定工单的晶圆才可以发料
    // queryData = (whereClause) => {
    //     const self = this;
    //     let {rowKey,tableData} = this.state;
    //     let requestObject = {
    //       tableRrn: this.state.tableRrn,
    //       whereClause: whereClause,
    //       success: function(responseBody) {
    //         let queryDatas = responseBody.dataList;
    //         if (queryDatas && queryDatas.length > 0) {
    //           let validationRequestObject = {
    //             materialLots: queryDatas,
    //             success: function(responseBody) {
    //               let materialLotList = responseBody.materialLotList;
    //               self.setState({ 
    //                 tableData: materialLotList,
    //                 loading: false
    //               });
    //             }         
    //           }
    //           WaferManagerRequest.sendValidationWaitIssueWaferRequest(validationRequestObject);
    //         }
    //       }
    //     }
    //     TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    // }
    
    buildTable = () => {
        return <GcWaitForIssueMLotUnitTable
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}