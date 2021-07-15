import ImportPartsMLotTable from "@components/mms/table/ImportPartsMLotTable";
import CsvImportProperties from "./CsvImportProperties";

/**
 * 备件批次导入
 */
export default class ImportPartsMLotProperties extends CsvImportProperties{

    static displayName = 'ImportPartsMLotProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    buildTable = () => {
        return (<ImportPartsMLotTable
          {...this.getDefaultTableProps()} 
          importTypeNbTable = {this.state.parameters.parameter1}/>)
    }

}