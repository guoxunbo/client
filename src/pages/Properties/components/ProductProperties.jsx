import EntityProperties from "./entityProperties/EntityProperties";
import ProductTable from "../../../components/Table/ProductTable";

export default class ProductProperties extends EntityProperties{

    static displayName = 'ProductProperties';
    
    buildTable = () => {
        return <ProductTable table={this.state.table}  data={this.state.tableData} loading={this.state.loading} />
    }

}