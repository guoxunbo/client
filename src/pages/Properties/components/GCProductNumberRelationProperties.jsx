import GCProductNumberRelationTable from "../../../components/Table/gc/GCProductNumberRelationTable";
import EntityProperties from "./entityProperties/EntityProperties";

export default class GCProductNumberRelationProperties  extends EntityProperties {

    static displayName = 'GCProductNumberRelationProperties';

    buildTable = () => {
        return <GCProductNumberRelationTable  table={this.state.table}  
                                              data={this.state.tableData} 
                                              loading={this.state.loading} 
                                              onSearch={this.queryData.bind(this)} 
                                              resetData={this.resetData.bind(this)}/>
    }
}