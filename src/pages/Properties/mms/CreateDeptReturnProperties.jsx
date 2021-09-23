import CreateDeptReturnTable from "@components/mms/table/CreateDeptReturnTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

/**
 * 创建部门退料
 */
export default class CreateDeptReturnProperties extends EntityScanProperties{

    static displayName = 'CreateDeptReturnProperties';

    constructor(props) {
        super(props);  
        this.state= {...this.state}
    }

    buildTable = () => {
        return <CreateDeptReturnTable
                        {...this.getDefaultTableProps()} 
                        pagination={false} 
                        properties = {this}
                        ref = {(createDeptTable) => {this.createDeptTable = createDeptTable}}
                        materialLotCreateDeptDialogTableName={this.state.parameters.parameter1}
                        />
    }  
   
}