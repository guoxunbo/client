import IncomingMLotImportTable from "@components/mms/table/IncomingMLotImportTable";
import EntityScanProperties from "@properties/framework/EntityScanProperties";

export default class IncomingMLotImportProperties extends EntityScanProperties{

    static displayName = 'IncomingMLotImportProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: false}, };
    }
    
    buildTable = () => {
      return (<IncomingMLotImportTable
                  {...this.getDefaultTableProps()} 
         
      />)
    }

}