import CsvImportTable from "@components/mms/table/CsvImportTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

/**
 * 适用于Csv导入
 */
export default class CsvImportProperties extends EntityScanProperties{

    static displayName = 'CsvImportProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    buildTable = () => {
        return (<CsvImportTable
                {...this.getDefaultTableProps()}  
                importTypeNbTable = {this.state.parameters.parameter1}/> 
                
          )
    }

}