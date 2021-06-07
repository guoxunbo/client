import UseSpareMLotTable from "@components/mms/table/UseSpareMLotTable";
import EntityProperties from "@properties/framework/EntityProperties";

/**
 * 备品备件使用
 */
export default class UseSpareMLotProperties extends EntityProperties{

    static displayName = 'UseSpareMLotProperties';
    
    buildTable = () => {
        return <UseSpareMLotTable {...this.getDefaultTableProps()} />
    }

}