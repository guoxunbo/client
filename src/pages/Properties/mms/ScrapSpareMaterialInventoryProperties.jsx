import TableManagerRequest from "@api/table-manager/TableManagerRequest";
import ScrapSpareMaterialInventoryTable from "@components/mms/table/ScrapSpareMaterialInventoryTable";
import EntityHistoryProperties from "../framework/EntityHistoryProperties";

/**
 * 备件报废库存以及报废出库
 */
export default class ScrapSpareMaterialInventoryProperties extends EntityHistoryProperties{

    static displayName = 'ScrapSpareMaterialInventoryProperties';
    
    afterQuery = (responseObject, whereClause) => {
        let self = this;
        let materials = responseObject.dataList;
        let requestObject = {
            tableRrn: this.state.parameters.parameter1,
            success: function(responseBody) {
                let table = responseBody.table;
                let requestObject = {
                    tableRrn: table.objectRrn,
                    whereClause: table.whereClause,
                    success: function(responseBody) {
                        let dataList = responseBody.dataList;
                        materials.map((material, index)=>{
                            let materialStockQty = 0;
                            let mLots = dataList.filter(data => data.materialName === material.name);
                            mLots.forEach(d => {
                                materialStockQty += d.currentQty;
                            });
                            material.materialStockQty = materialStockQty;
                        })
                        self.setState({
                            tableData: materials,
                            loading: false,
                        });
                    }
                }
                TableManagerRequest.sendGetDataByRrnRequest(requestObject);
            }
        }
        TableManagerRequest.sendGetByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <ScrapSpareMaterialInventoryTable {...this.getDefaultTableProps()} queryData={this.queryData.bind(this)} actionTable={this.state.parameters.parameter2}/>
    }

}