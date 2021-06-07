import EntityScanProperties from "@properties/framework/EntityScanProperties";
import IncomingLabMLotImportTable from "@components/mms/table/IncomingLabMLotImportTable";

/**
 * 实验室来料导入
 */
export default class IncomingLabMLotImportProperties extends EntityScanProperties{

    static displayName = 'IncomingLabMLotImportProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    buildTable = () => {
        return (<IncomingLabMLotImportTable
          {...this.getDefaultTableProps()} 
          importTypeNbTable = {this.state.parameters.parameter1}/>)
    }

}