import IncomingMaterialDeleteTable from "@components/mms/table/IncomingMaterialDeleteTable";
import EntityProperties from "@properties/framework/EntityProperties";

export default class IncomingMaterialDeleteProperties extends EntityProperties{

    static displayName = 'IncomingMaterialDeleteProperties';

    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    } 

    buildTable = () => {
        return <IncomingMaterialDeleteTable
                        {...this.getDefaultTableProps()}
                        resetData = {this.resetData}
                        propertiesForm = {this.form}
        />
    }

}