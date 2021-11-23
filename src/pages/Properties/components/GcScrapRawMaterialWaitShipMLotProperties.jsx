import EntityProperties from "./entityProperties/EntityProperties";
import ScrapRawMaterialWaitShipMLotTable from "../../../components/Table/gc/ScrapRawMaterialWaitShipMLotTable";

export default class GcScrapRawMaterialWaitShipMLotProperties extends EntityProperties{

    static displayName = 'GcScrapRawMaterialWaitShipMLotProperties';

    componentWillReceiveProps = () => {
        this.queryData();
    }

    buildTable = () => {
        return <ScrapRawMaterialWaitShipMLotTable 
                                    pagination={true} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    />
    }

}