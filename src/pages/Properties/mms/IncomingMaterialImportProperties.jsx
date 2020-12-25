import EntityScanProperties from "@properties/framework/EntityScanProperties";
import IncomingMaterialImportTable from "@components/mms/table/IncomingMaterialImportTable";
import { Divider } from "antd";

export default class IncomingMaterialImportProperties extends EntityScanProperties{

    static displayName = 'IncomingMaterialImportProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    buildTable = () => {
        return (<IncomingMaterialImportTable 
          {...this.getDefaultTableProps()}  /> 
       
          )
    }

}