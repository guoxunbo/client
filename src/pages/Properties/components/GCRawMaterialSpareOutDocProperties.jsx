import EntityProperties from "./entityProperties/EntityProperties";
import RawMaterialSpareOutDocTable from "../../../components/Table/gc/RawMaterialSpareOutDocTable";


export default class GCRawMaterialSpareOutDocProperties extends EntityProperties{

    static displayName='GCRawMaterialSpareOutDocProperties';

    buildTable = () => {
        return  <RawMaterialSpareOutDocTable rowKey={this.state.rowKey} 
                                  selectedRowKeys={this.state.selectedRowKeys} 
                                  selectedRows={this.state.selectedRows} 
                                  table={this.state.table} 
                                  data={this.state.tableData} 
                                  loading={this.state.loading}                                  
                                   />
    }

}