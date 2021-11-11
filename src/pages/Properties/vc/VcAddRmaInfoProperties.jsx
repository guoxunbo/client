import VcAddRmaInfoTable from "@components/vc/table/VcAddRmaInfoTable";
import EntityScanProperties from "../framework/EntityScanProperties";

/**
 * 添加批次RMA号码
 */
export default class VcAddRmaInfoProperties extends EntityScanProperties{

    static displayName =  'VcAddRmaInfoProperties';
    

    buildTable = () => {
        return (<VcAddRmaInfoTable
                {...this.getDefaultTableProps()}
                AddRmaNoActionTableName = {this.state.parameters.parameter1} />)
    }
   
}
