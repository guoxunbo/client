import EntityScanProperties from "@properties/framework/EntityScanProperties";
import IncomingMaterialImportTable from "@components/mms/table/IncomingMaterialImportTable";
import TableUtils from "@components/framework/utils/TableUtils";

export default class IncomingMaterialImportProperties extends EntityScanProperties{

    static displayName = 'IncomingMaterialImportProperties';

    constructor(props) {
      super(props);
      this.state = {...this.state, ...{showQueryFormButton: true}, incomingType:"IncomingMaterialImport"};
    }

    queryData = (whereClause) => {
        let queryFields = this.form.props.form.getFieldsValue();
        if(queryFields){
          this.setState({
            incomingType: queryFields.IncomingType
          })
          TableUtils.initTable(this.importTable, undefined, queryFields.IncomingType);
        }
    }



    buildTable = () => {
        return (<IncomingMaterialImportTable 
                  ref={(importTable) => {this.importTable = importTable}}
                  incomingType = {this.state.incomingType}
                  {...this.getDefaultTableProps()}/>)
    }

}