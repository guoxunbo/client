import EntityProperties from "./entityProperties/EntityProperties";
import UnReserverdMaterialLotTable from "../../../components/Table/gc/UnReserverdMaterialLotTable";
import ReservedManagerRequest from '../../../api/gc/reserved-manager/ReservedManagerRequest';

export default class GCUnReservedMaterialLotProperties extends EntityProperties{

    static displayName = 'GCUnReservedMaterialLotProperties';
    
    getTableData = () => {
        const self = this;
        let requestObject = {
            tableRrn: this.state.tableRrn,
            success: function(responseBody) {
                self.setState({
                    tableData: responseBody.materialLotList,
                    table: responseBody.table,
                    loading: false
                }); 
            }
        }
        ReservedManagerRequest.sendGetMaterialLotAndUserByRrnRequest(requestObject);
    }

    queryData = (whereClause) => {
        const self = this;
        let requestObject = {
            tableRrn: this.state.tableRrn,
            whereClause: whereClause,
            success: function(responseBody) {
                self.setState({
                    tableData: responseBody.materialLotList,
                    loading: false
                });
            }
        }
        ReservedManagerRequest.sendGetMaterialLotAndUserByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <UnReserverdMaterialLotTable table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}