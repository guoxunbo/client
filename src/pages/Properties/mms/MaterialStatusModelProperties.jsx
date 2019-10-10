import EntityProperties from "@properties/framework/EntityProperties";
import StatusModelTable from "@components/Table/StatusModelTable";
import { EntityModel } from "@const/ConstDefine";

export default class MaterialStatusModelProperties extends EntityProperties{

    static displayName = 'MaterialStatusModelProperties';
    
    buildTable = () => {
        return <StatusModelTable eventModelClass={EntityModel.MaterialEvent} table={this.state.table} data={this.state.tableData} loading={this.state.loading} />
    }

}