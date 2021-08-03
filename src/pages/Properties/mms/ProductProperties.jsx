import EntityProperties from "@properties/framework/EntityProperties";
import ProductTable from "@components/mms/table/ProductTable";

export default class ProductProperties extends EntityProperties{

    static displayName = 'ProductProperties';
    
    buildTable = () => {
        return <ProductTable {...this.getDefaultTableProps()} />
    }

}