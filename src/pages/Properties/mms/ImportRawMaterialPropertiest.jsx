import ImportRawMaterialTable from "@components/mms/table/ImportRawMaterialTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";


export default class ImportRawMaterialProperties extends EntityScanProperties{

    static displayName = 'ImportRawMaterialProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    buildTable = () => {
        return (<ImportRawMaterialTable
                {...this.getDefaultTableProps()}  
                importTypeNbTable = {this.state.parameters.parameter1}/> 
                
          )
    }

}